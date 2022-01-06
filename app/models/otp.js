const mongoose = require("mongoose");
const dayjs = require('dayjs');

// otp schema
now = dayjs().format('YYYY-MM-DD HH:mm:ss');
const OTPSchema = new mongoose.Schema({
    createdFor: {type: mongoose.Types.ObjectId, required: 'User ID is required' /*, minlength:25, maxlength:25*/},
    otp: {type: Number, required: 'OTP number is required', minlength:4, maxlength:6},
    requestType: {type: String, required: 'Request type is required', enum: ['verify-email', 'reset-password', 'confirm-transaction']},
    expiredAt: {type: String, default: null},
    createdAt: {type: String, default: now},
    updatedAt: {type: String, default: now},
});

const OTP = mongoose.model('OTP', OTPSchema);
module.exports = OTP;