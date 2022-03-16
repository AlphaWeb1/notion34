const{response} = require("../services");

exports.handle = (req, res, next) => {
    try {
        const apiPrefix = `/${process.env.API}${process.env.API_VERSION}`;
        console.log('? Prefix', apiPrefix);
        
        res.headers = res?.headers ?? {};
        res.headers.render = req.url.startsWith(`/${process.env.API}${process.env.API_VERSION}`) ? 'json':'html';
    } catch (error) {
        console.log('[!] Web Middleware Fail To Be Invoked:', error.message);
        return response.failed(res, 401, `Web Middleware Fail To Invoke`, ['Token Source Generation Failed'], 'guest/home');
    }
    return next();
};