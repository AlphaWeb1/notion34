const {check, body} = require ('express-validator');

exports.loginBasic = [
    check('email', 'Email is required').notEmpty(),
    check('email', 'A valid email is required').isEmail(),

    check('password', 'Password is required').notEmpty(),
    check('password', 'Password must have at least a lowercase, an uppercase, a number, a special character, and minimum of 8 character length')
    .matches(/^(?=.*?[A-Z])(?=.*?[a-])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/).isLength({min: 8}),
]