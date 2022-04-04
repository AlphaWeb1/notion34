const express = require('express'),
    controller = require('../app/controllers'),
    middlewares = require('../app/middleware'),
    validator = require('../app/validators/index'),
    router = express.Router();

/* guest routes*/
router.get(`/`, middlewares.Web.handle, controller.guest.homeController.index);
router.get(`/home`, middlewares.Web.handle, controller.guest.homeController.home);
router.get(`/about`, middlewares.Web.handle, controller.guest.homeController.about);
router.get(`/gallery`, middlewares.Web.handle, controller.guest.homeController.gallery);
router.get(`/contact`, middlewares.Web.handle, controller.guest.homeController.contact);

router.get(`/categories`, middlewares.Web.handle, controller.guest.categoryController.index);
router.get(`/categories/:category`, middlewares.Web.handle, controller.guest.categoryController.category);

router.get(`/files`, middlewares.Web.handle, controller.guest.fileController.index);
router.get(`/files/:category`, middlewares.Web.handle, controller.guest.fileController.categoryFiles);
router.get(`/file/:id`, middlewares.Web.handle, controller.guest.fileController.file);

/* auth route*/
router.get([`/login`, `/admin`], middlewares.Web.handle, controller.auth.loginController.index);
router.post([`/login`, `/admin`], middlewares.Web.handle, validator.auth.login.loginBasic, controller.auth.loginController.authenticate);

router.get(`/register`, middlewares.Web.handle, controller.auth.registerController.index);
router.post(`/register`, middlewares.Web.handle, validator.auth.register.registerBasic, controller.auth.registerController.register);

router.get([`/forgot-password`], middlewares.Web.handle, controller.auth.resetPassword.index);

module.exports = router;