const Token = require('../models/token'),
    {response} = require("../services");

exports.checkToken = (req, res, next) => {
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
        return Token.findOne({token}, (error, data) => {
            if (data) {
                req.token = data;
                return next();
            }
            if (error){
                console.log('[!] Token Error:', error);
                return response.failed(res, 500, `Server Error`, [error.message ?? error], 'auth/login');
            }
            if (!error && !data)
                console.log('[!] Token Does not exist:');
                return response.failed(res, 403, `Token Validation Error`, ['Token Does not exist'], 'auth/login');
        });
    } catch (error) {
        console.log('[!] Token Validation Failed:', error);
        return response.failed(res, 401, `Token Authorization Error`, ['Invalid Token'], 'auth/login');
    }
};