const { verify } = require('jsonwebtoken');
const User = require('../models/user');

exports.verified = (req, res, next) => {
    // console.log('Headers', req.headers);
    let token = req.body.token || req.query.token || req.headers["x-access-token"] || req.headers["authorization"];

    if (!token) {
        console.log('[!] Token Validation Failed!', 'A toking is required for authentication.');
        return res.status(403).send({code: 403, error: 'Token Validation Failed', message: 'Warning! A toking is required for authentication.'});
    }

    try {
        if (req.headers["authorization"]) {
            token = token.split(" ");
            token = token[1];
        }
        const decoded = verify(token, process.env.JWT_TOKEN_KEY);

        req.token = token;
        req.user = decoded;

        return User.findOne({_id: decoded.user_id}, (error, data) => {
            if (data) {
                req.user = data;
                if (!data?.email_verified_at || data?.email_verified_at == null) {
                    return res.status(403).send({ code: 403, message: 'User Not verified', error: 'Invalid User.', errors: ['User not verified'] });
                }
                return next();
            }
            if (error){
                console.log('[!] User Error @Verify Middleware:', error);
                return res.status(500).send({code: 500, error: error.message ?? error, message: 'Oops! Something went wrong.'});
            }
            if (!error && !data)
            console.log('[!] User Does not exist @Verify Middleware:');
                return res.status(403).send({ code: 403, message: 'User Validation Failed', error: 'Invalid User.', errors: ['User Does not exist'] });
        });
    } catch (error) {
        console.log('[!] User Validation Failed:', error);
        return res.status(403).send({code: 401, error: 'User Validation Failed', message: 'Invalid User.'});
    }
};