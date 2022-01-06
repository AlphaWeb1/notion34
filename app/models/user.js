const mongoose = require("mongoose");
const dayjs = require('dayjs');

// user schema
now = dayjs().format('YYYY-MM-DD HH:mm:ss');
const UserSchema = new mongoose.Schema({
    // id: {type:Number, required:true},
    firstName: {type:String, required: 'First Name is required', minlength:4, maxlength:100},
    lastName: {type: String, required: 'Last Name is required', minlength:4, maxlength:100},
    phone: {type: String, required: 'Phone Number is required', match: /^([0-9\s\-\+\(\)]*)$/},
    email: {type: String, required: 'Email Is required', match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/},
    password: {type: String, required: 'Password Is required'},
    isAdmin: {type: Boolean, required: 'UserType', enum: [false, true]},
    emailVerifiedAt: {type: String, default: null},
    createdAt: {type: String, default: now},
    updatedAt: {type: String, default: now},
});

const User = mongoose.model('User', UserSchema);
module.exports = User;