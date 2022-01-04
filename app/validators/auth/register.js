const {check, body} = require ('express-validator');

exports.registerBasic = [
    check('first_name', 'First Name is required').notEmpty(),
    check('first_name', 'First Name must be between 4 and 100 character length').isLength({min: 4, max: 100}),
    
    check('last_name', 'Last Name is required').notEmpty(),
    check('last_name', 'Last Name must be between 4 and 100 character length').isLength({min: 4, max: 100}),

    check('email', 'Email is required').notEmpty(),
    check('email', 'A valid email is required').isEmail(),

    check('phone', 'Phone is required').notEmpty(),
    check('phone', 'A valid phone is required').matches(/^([0-9\s\-\+\(\)]*)$/),

    check('password', 'Password is required').notEmpty(),
    check('password', 'Password must have at least a lowercase, an uppercase, a number, a special character, and minimum of 8 character length')
    .matches(/^(?=.*?[A-Z])(?=.*?[a-])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/).isLength({min: 8}),
    
    check('confirm_password', 'Confirm Password is required').notEmpty(),
    check('confirm_password', 'Confirm password should match with password').custom((value, { req }) => value === req.body.password),

    check('terms', 'Accept the terms and condition').custom((value, { req }) => value === true || value === 1),
    check('terms', 'Accept the terms and condition').isBoolean(),
]