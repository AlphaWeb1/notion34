const OTP = require('../models/otp');

exports.createOTP = (user, info) => {
    try{
        return OTP.updateOne({createdFor: user._id}, {$set: info}, {upsert: true}, (error, data) => {
            if (data){
                return data;
            }
            if (error){
                console.log('[!] DB error user OTP creation:', error);
                return false;
            }
        });
    } catch (error) {
        console.log('[!] Failed to create OTP:', error);
        return null;
    }
}

exports.getOTP = (userId) => {
    try{
        return OTP.findOne({ createdFor: userId });
    } catch (error) {
        console.log('[!] Failed to fetch OTP:', error);
        return null;
    }
}