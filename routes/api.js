const express = require('express'),
    controller = require('../app/controllers'),
    middlewares = require('../app/middleware/index'),
    validator = require('../app/validators/index'),
    router = express.Router();

/* guest routes*/
router.get(`/`, middlewares.API.handle, controller.guest.homeController.index);
router.get(`/home`, middlewares.API.handle, controller.guest.homeController.home);

router.get(`/categories`, middlewares.API.handle, controller.guest.categoryController.index);
router.get(`/categories/:category`, middlewares.API.handle, controller.guest.categoryController.category);
// files all, files by category, file detail

/* auth route*/
router.post(`/login`, middlewares.API.handle, validator.auth.login.loginBasic, controller.auth.loginController.authenticate);
router.post(`/register`, middlewares.API.handle, validator.auth.register.registerBasic, controller.auth.registerController.register);


module.exports = router;