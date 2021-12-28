const {response} = require("../../services");
exports.index = (req, res) => {
    // res.status(200).json({success: true, data: {}, message: `Server say's Ok`});
    return response.success(res, 200, `Server say's Ok`, {}, 'index');
}

exports.home = (req, res) => {
    return response.success(res, 200, `Server say's Ok`, {}, 'guest/home');
}