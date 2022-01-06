const response = require('./response.service'),
    otpService = require('./otp.service'),
    randomService = require('./random.service'),
    emailService = require('./email.service');

module.exports = {
    response,
    otpService,
    randomService,
    emailService
}