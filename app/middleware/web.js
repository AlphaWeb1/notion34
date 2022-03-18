const{response} = require("../services");

exports.handle = (req, res, next) => {
    try {
        res.headers = res?.headers ?? {};
        res.headers.render = 'html';
        res.request_url = req.url;
    } catch (error) {
        console.log('[!] Web Middleware Fail To Be Invoked:', error.message);
        return response.failed(res, 500, `Web middleware fail to invoke`, [error.message], 'guest/home');
    }
    return next();
};