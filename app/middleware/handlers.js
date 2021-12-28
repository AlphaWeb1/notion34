const express = require('express');
const errors = express.Router();

const error500 = ( err, req, res, next) => {
    console.log(err.stack);
    res.status(500).send({
        code : 500,
        error: 'Server Error.',
        message: 'Something went wrong'
    });
}

// 404 error
const error404 = ( req, res, next) => {
    res.status(404).send({
        code : 404,
        error: 'Resource not found',
        message: 'Resource not found'
    });
};

// 403 error
const error403 = ( req, res, next) => {
    res.status(403).send({
        code : 403,
        error: 'Forbidden request',
        message: 'Forbidden request'
    });
};

errors.use(error500);
errors.use(error404);
errors.use(error403);

exports.errors = errors;

exports.useErrors = (app) => {
    app.use(error500);
    app.use(error404);
    app.use(error403);
}