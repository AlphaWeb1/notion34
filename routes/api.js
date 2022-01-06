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

router.get(`/files`, middlewares.API.handle, controller.guest.fileController.index);
router.get(`/files/:category`, middlewares.API.handle, controller.guest.fileController.categoryFiles);
router.get(`/file/:id`, middlewares.API.handle, controller.guest.fileController.file);

/* auth route*/
router.post(`/login`, middlewares.API.handle, validator.auth.login.loginBasic, controller.auth.loginController.authenticate);
router.post(`/register`, middlewares.API.handle, validator.auth.register.registerBasic, controller.auth.registerController.register);

/* admin routes */


module.exports = router;