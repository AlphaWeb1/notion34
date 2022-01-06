const{response} = require("../services");

exports.handle = (req, res, next) => {
    try {
        res.headers = res?.headers ?? {};
        res.headers.render = 'html';
    } catch (error) {
        console.log('[!] Web Middleware Fail To Be Invoked:', error.message);
        return response.failed(res, 401, `Web Middleware Fail To Invoke`, ['Token Source Generation Failed'], 'guest/home');
    }
    return next();
};