exports.handle = (req, res, next) => {
    try {
        res.headers = res?.headers ?? {};
        res.headers.render = 'html';
    } catch (error) {
        console.log('[!] Web Middleware Fail To Be Invoked:', error.message);
        return res.status(401).json({code: 401, error: 'Web Middleware Fail To Be Invoked', message: 'Invalid Token.'});
    }
    return next();
};