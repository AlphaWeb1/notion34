const { verify } = require('jsonwebtoken'),
    User = require('../models/user'),
    {response} = require("../services");

exports.verified = (req, res, next) => {
    // console.log('Headers', req.headers);
    let token = req.body.token || req.query.token || req.headers["x-access-token"] || req.headers["authorization"];

    if (!token) {
        console.log('[!] Token Validation Failed!', 'A toking is required for authentication.');
        return response.failed(res, 403, `Token Validation Error`, ['Token is required for authentication'], 'auth/login');
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
                    return response.failed(res, 403, `Autorization Error`, ['User not verified'], 'user/dashboard');
                }
                return next();
            }
            if (error){
                console.log('[!] User Error @Verify Middleware:', error);
                return response.failed(res, 500, `Server Error`, [error.message ?? error], 'auth/login');
            }
            if (!error && !data)
                console.log('[!] User Does not exist @Verify Middleware:');
                return response.failed(res, 403, `User Validation Error`, ['User Does not exist'], 'auth/register');
        });
    } catch (error) {
        console.log('[!] User Validation Failed:', error);
        return response.failed(res, 401, `User Validation Error`, ['Invalid User'], 'auth/register');
    }
};