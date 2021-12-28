exports.handle = (req, res, next) => {
    try {
        res.headers = res?.headers ?? {};
        res.headers.render = 'json';
    } catch (error) {
        console.log('[!] API Middleware Fail To Be Invoked:', error.message);
        return res.status(401).json({code: 401, error: 'API Middleware Fail To Be Invoked', message: 'Invalid Token.'});
    }
    return next();
};