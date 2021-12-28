const express = require('express'),
    env = require('dotenv'),
    {config} = require('./config'),
    routes = require('./routes'),
    middlewares = require('./app/middleware'),
    core = require('./app/core');

// init app express
const app = express();

// configure environment variables
env.config();
config(process.env);

// middlewares (pre)
core(app, __dirname);

//define routes
app.use(`/${process.env.API}${process.env.API_VERSION}`, routes.api);
app.use(`/`, routes.web);


// middlewares (post)
middlewares.ErrorHandler.useErrors(app);

app.listen(process.env.APP_PORT || 8301, () => {
    console.log(
        `Node server running on Project: ${process.env.APP_NAME}
        URL:${process.env.APP_URL}:${process.env.APP_PORT}/
        Host: ${process.env.APP_URL}
        port: ${process.env.APP_PORT}`
    );
});