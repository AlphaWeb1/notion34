const jwt = require("jsonwebtoken");

exports.authorize = (req, res, next) => {
    // console.log('Headers', req.headers);
    let token = req.body.token || req.query.token || req.headers["x-access-token"] || req.headers["authorization"];

    if (!token) {
        console.log('[!] Authorization Failed!', 'A toking is required for authentication.');
        return res.status(403).json({code: 403, error: 'Authorization Failed', message: 'Warning! A toking is required for authentication.'});
    }

    try {
        if (req.headers["authorization"]) {
            token = token.split(" ");
            token = token[1];
        }
        const decoded = jwt.verify(token, process.env.JWT_TOKEN_KEY);

        req.token = token;
        req.user = decoded;
        // console.log('Authorization Passed! User:', res.user);
    } catch (error) {-
        console.log('[!] Authorization Failed:', error.message);
        return res.status(401).json({code: 401, error: 'Authoirization Failed', message: 'Invalid Token.'});
    }
    return next();
};