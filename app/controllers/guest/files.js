const {response} = require("../../services");
exports.index = (req, res) => {
    return response.success(res, 200, `Server say's Files `, {files: ['File 1', 'FiLE 2']}, 'guest/files');
}

exports.categoryFiles = (req, res) => {
    const {category} = req.params;
    console.log(`Category: ${category}`);
    return response.success(res, 200, `Server say's Category Files `, {category: 'category 1', files: ['File 1', 'FiLE 2']}, 'guest/files');
}

exports.file = (req, res) => {
    return response.success(res, 200, `Server say's File detail `, {name: 'File 1', category: 'category 1', path: 'path/to/file'}, 'guest/file');
}