module.exports = {
    guest: {
        homeController: require('./guest/home'),
        categoryController: require('./guest/categories'),
        fileController: require('./guest/files'),
    },
    auth: {
        loginController: require('./auth/login'),
        registerController: require('./auth/register'),
        // OTPController: require('./auth/otp'),
        resetPassword: require('./auth/reset'),
    },
    admin: {
        // clientDashboardController: require('./admin/dashboard'),
        // profileController: require('./admin/profile')
        // categoryController: require('./admin/categories'),
        // fileController: require('./admin/files'),
    }
    // clientDashboardController: require('./client/dashboard'),
    // profileController: require('./client/profile')
}