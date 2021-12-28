const //CheckToken = require('./check-token'),
    Authorize =  require('./auth'),
    Web =  require('./web'),
    API =  require('./api'),
    // Verified =  require('./verified'),
    ErrorHandler =  require('./handlers');

module.exports = {
    Web,
    API,
    // CheckToken,
    Authorize,
    // Verified,
    ErrorHandler
}