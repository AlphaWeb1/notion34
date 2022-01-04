module.exports = {
    guest: {
        homeController: require('./guest/home'),
        categoryController: require('./guest/categories'),
    },
    auth: {
        loginController: require('./auth/login'),
        registerController: require('./auth/register'),
        // OTPController: require('./auth/otp'),
        // ResetPassword: require('./auth/password-reset'),
    },
    // clientDashboardController: require('./client/dashboard'),
    // profileController: require('./client/profile')
}