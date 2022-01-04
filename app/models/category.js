const mongoose = require("mongoose");
const dayjs = require('dayjs');

// category schema
now = dayjs().format('YYYY-MM-DD HH:mm:ss');
const CategorySchema = new mongoose.Schema({
    title: {type:String, required: 'Title is required', minlength:4, maxlength:100},
    description: {type:String, default:'', maxlength:255},
    imagePath: {type: String, default: null},
    featured: {type: Boolean, default: false},
    createdBy: {type: mongoose.Types.ObjectId, required: 'User ID is required'},
    updatedBy: {type: mongoose.Types.ObjectId, required: 'User ID is required'},
    createdAt: {type: String, default: now},
    updatedAt: {type: String, default: now},
});

const Category = mongoose.model('Category', CategorySchema);
module.exports = Category;