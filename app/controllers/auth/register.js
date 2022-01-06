const bcrypt = require('bcryptjs'),
    jwt = require('jsonwebtoken'),
    dayjs = require('dayjs'),
    {validationResult} = require ('express-validator'),
    User = require('../../models/user'),
    Token = require('../../models/token'),
    {response, otpService, randomService, emailService} = require("../../services");


exports.index = (req, res) => {
    return response.success(res, 200, `Server say's Registration Page`, {}, 'auth/register');
}

exports.register = (req, res) => {
    
    errors = validationResult(req);
    if (!errors.isEmpty()) {
        return response.failed(res, 400, `Validation Error`, (errors.array().map(error => error.msg)), 'auth/register');
    } else {
        /** filter and fetch request body */
        const {first_name, last_name, email, phone, password} = req.body;
        
        User.findOne({ email: email.toLowerCase() }).then(userInfo =>{
            if (userInfo?.email) {
                return response.failed(res, 400, `Validation Error`, ['Email already exists'], 'auth/register');
            } else {
                bcrypt.hash(password, 10)
                .then(password =>{
                    const now = dayjs().format('YYYY-MM-DD HH:mm:ss');
                    /** create user record */
                    const user = new User({
                        firstName: first_name.toLowerCase(),
                        lastName: last_name.toLowerCase(),
                        email: email.toLowerCase(), // sanitize: convert email to lowercase
                        phone,
                        password,
                        isAdmin: false,
                        createdAt: now,
                        updatedAt: now
                    });

                    user.save()
                    .then((user) => { 
                        /** generate jwt token */
                        const token = jwt.sign(
                            { userId: user._id, email, names: `${user.firstName} ${user.lastName}`, emailVerifiedAt: user.emailVerifiedAt },
                            process.env.JWT_TOKEN_KEY,
                            { expiresIn: "2h",}
                        );

                        /** get jwt instance if any*/
                        let dt = dayjs().add(2, 'hours');
                        let tokenData = {
                            token,
                            refreshToken: bcrypt.encodeBase64(user.email),
                            expiredAt: dt,
                            createdAt: now,
                            updatedAt: now
                        };

                        Token.updateOne({ ownedBy: user._id }, {
                            $set: tokenData,
                        }, {
                            upsert: true
                        }).then(resp => {
                            const otpInfo =  {
                                otp: randomService.getNumber(6), 
                                requestType: 'verify-email', 
                                createdFor: user._id, 
                                expiredAt: dt,
                                createdAt: now,
                                updatedAt: now
                            };

                            const otp = otpService.createOTP(user, otpInfo);
                            console.log('OTP: ', otp);
                            if (otp) {
                                emailService.accountCreation(user, otpInfo);
                            } else {
                                return response.redirect(res, `Server say's Registration is successful. Unable to send OTP, try to request another`, 201, true, { userInfo: user }, 'user/dashboard');
                            }
                            return response.redirect(res, `Server say's Registration is successful. check you email for OTP`, 200, true, { userInfo: user, token: tokenData }, '/user/dashboard');
                        })
                        .catch(error => {
                            console.error('[>] Token Error:', error);
                            return response.failed(res, 400, `Token Error`, ['Unable to generate auth token'], 'auth/login');
                        });
                    }).catch(error => {
                        console.error('[>] Creating User Record Failed: ', error);
                        return response.failed(res, 400, `Registration Error`, [error.message], 'auth/register');
                    });

                })
                .catch(error => {
                    console.error('[>] Password Encryption Failed: ', error);
                    return response.failed(res, 400, `Registration Error`, [error.message], 'auth/register');
                });
            }
        }).catch(error => {
            console.error('[>] User Fetch Failed: ', error);
            return response.failed(res, 400, `Connection Error`, [error.message], 'auth/register');
        });
    }
}