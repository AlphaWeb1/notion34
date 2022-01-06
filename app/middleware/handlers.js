const express = require('express');
const errors = express.Router(),
{response} = require('../services');

// 500 error
const error500 = ( err, req, res, next) => {
    console.log('[!] Error:', err.stack);
    return response.failed(res, 500, `Server Error`, ['Something went wrong'], 'errors/500');
}

// 404 error
const error404 = ( req, res, next) => {
    return response.failed(res, 404, `Request Error`, ['Resource not found'], 'errors/404');
};

// 403 error
const error403 = ( req, res, next) => {
    return response.failed(res, 403, `Request Error`, ['Forbidden request'], 'errors/403');
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