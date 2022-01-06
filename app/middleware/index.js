const Token = require('./token'),
    Authorize =  require('./auth'),
    Web =  require('./web'),
    API =  require('./api'),
    Verified =  require('./verified'),
    ErrorHandler =  require('./handlers');

module.exports = {
    Web,
    API,
    Token,
    Authorize,
    Verified,
    ErrorHandler
}