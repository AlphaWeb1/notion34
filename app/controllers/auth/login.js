const {response} = require("../../services");
const bcrypt = require('bcryptjs'),
    jwt = require('jsonwebtoken'),
    User = require('../../models/user'),
    Token = require('../../models/token'),
    dayjs = require('dayjs'),
    {validationResult} = require ('express-validator');

exports.index = (req, res) => {
    return response.success(res, 200, `Server say's Login Page`, {}, 'auth/login');
}

exports.authenticate = (req, res) => {
    errors = validationResult(req);
    if (!errors.isEmpty()) {
        return response.failed(res, 400, `Validation Error`, (errors.array().map(error => error.msg)), 'auth/login');
    } else {
        const {email, password} = req.body;
        
        User.findOne({ email: email.toLowerCase() })
        .then(userInfo =>{
            if (!userInfo) {
                return response.failed(res, 401, `Authentication Error`, ['Email Does not exist'], 'auth/login');
            } else {
                bcrypt.compare(password, userInfo.password)
                .then(data =>{
                    /** generate jwt token */
                    if (data){
                        const token = jwt.sign(
                            { user_id: userInfo._id, email, email_verified_at: userInfo.email_verified_at },
                            process.env.JWT_TOKEN_KEY,
                            { expiresIn: "2h",}
                        );

                        /** get jwt instance if any*/
                        let dt = dayjs().add(2, 'hours');
                        let tokenData = {
                            token,
                            refresh_token: bcrypt.encodeBase64(userInfo.email),
                            expired_at: dt,
                            updated_at: now
                        };

                        Token.updateOne({ ownedBy: userInfo._id }, {
                            $set: tokenData,
                        }, {
                            upsert: true
                        }).then(data => {
                            return response.redirect(res, 200, true, `Server say's Login is successful`, { userInfo, token: tokenData }, '/client/dashboard');
                        })
                        .catch(error => {
                            console.log('[!] Server Error: ', error);
                            return response.failed(res, 500, `Server Error`, [error.message], 'auth/login');
                        });
                    } else {
                        return response.failed(res, 401, `Authentication Error`, ['Password not match'], 'auth/login');
                    }  
                })
                .catch(error => {
                    console.log('[!] Password Match Failed: ', error);
                    return response.failed(res, 500, `Password Match Failed`, [error.message], 'auth/login');
                });
            }  
        }).catch(error => {
            console.log('[!] Server Error: ', error);
            return response.failed(res, 500, `Server Error`, [error.message], 'auth/login');
        });
    }
}

