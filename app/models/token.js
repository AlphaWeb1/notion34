const mongoose = require("mongoose");
const dayjs = require('dayjs');

// token schema
now = dayjs().format('YYYY-MM-DD HH:mm:ss');
const TokenSchema = new mongoose.Schema({
    token: {type: String, default: null},
    refreshToken: {type: String, default: null},
    ownedBy: {type: mongoose.Types.ObjectId, required: 'User ID is required'},
    expiredAt: {type: String, default: now},
    createdAt: {type: String, default: now},
    updatedAt: {type: String, default: now},
});

const Token = mongoose.model('Token', TokenSchema);
module.exports = Token;