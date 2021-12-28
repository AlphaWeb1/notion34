const express = require('express'),
    controller = require('../app/controllers'),
    middlewares = require('../app/middleware/index'),
    // validator = require('../app/validators/validator'),
    router = express.Router();

/* guest routes*/
router.get(`/`, middlewares.API.handle, controller.guest.homeController.index);
router.get(`/home`, middlewares.API.handle, controller.guest.homeController.home);

module.exports = router;