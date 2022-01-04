const {response} = require("../../services");
exports.index = (req, res) => {
    return response.success(res, 200, `Server say's Category `, {categories: ['category 1', 'cATEGORY 2']}, 'guest/categories');
}

exports.category = (req, res) => {
    const {category} = req.params;
    console.log(`Category: ${category}`);
    return response.success(res, 200, `Server say's Category `, {}, 'guest/category');
}