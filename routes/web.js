const express = require('express'),
    controller = require('../app/controllers'),
    middlewares = require('../app/middleware'),
    validator = require('../app/validators/index'),
    router = express.Router();

/* guest routes*/
router.get(`/`, middlewares.Web.handle, controller.guest.homeController.index);
router.get(`/home`, middlewares.Web.handle, controller.guest.homeController.home);

router.get(`/categories`, middlewares.Web.handle, controller.guest.categoryController.index);
router.get(`/categories/:category`, middlewares.Web.handle, controller.guest.categoryController.category);
// files all, files by category, file detail

/* auth route*/
router.get(`/login`, middlewares.Web.handle, controller.auth.loginController.index);
router.post(`/login`, middlewares.Web.handle, validator.auth.login.loginBasic, controller.auth.loginController.authenticate);

router.get(`/login`, middlewares.Web.handle, controller.auth.registerController.index);
router.post(`/register`, middlewares.Web.handle, validator.auth.register.registerBasic, controller.auth.registerController.register);

module.exports = router;