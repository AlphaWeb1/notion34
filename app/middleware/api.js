exports.handle = (req, res, next) => {
    try {
        res.headers = res?.headers ?? {};
        res.headers.render = 'json';
        res.request_url = req.url;
    } catch (error) {
        console.log('[!] API Middleware Fail To Be Invoked:', error.message);
        return res.status(500).json({code: 500, error: 'API middleware fail to invoke', message: error.message});
    }
    return next();
};