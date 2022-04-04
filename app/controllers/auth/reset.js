

exports.index = (req, res) => {
    return response.success(res, 200, `Server say's Forgot Password Page`, {}, 'auth/forgot-password');
}