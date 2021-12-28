const cors = require('cors'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    fileUpload = require('express-fileupload'),
    path = require('path'),
    {dbSetup, connect} = require('./models'),
    express = require('express');

module.exports = (app, dir_name = null) => {
    app.use(morgan('dev')); // tracking routes

    dir_name = process.env.ENABLE_VIEW ? dir_name : null;

    app.use(fileUpload({
        createParentPath: true,
        tempFileDir : process.env.TEMP_FILE_UPLOAD_DIR || `/upload_tmp/`,
        useTempFiles : true,
        uploadTimeout: process.env.FILE_UPLOAD_TIMEOUT || 60000,
        debug: process.env.FILE_UPLOAD_DEBUG || false,
        limits: { fileSize: 10 * 1024 * 1024 * 1024 },

    })); // enable files upload

    app.use(cors()); // cross origin control
    app.use(bodyParser.urlencoded({ extended: false })); // urlencoding setup for form data
    app.use(bodyParser.json()); // form data to json

    if (dir_name != null) {
        console.log('Init View Engine');
        app.set("view engine", "pug");
        app.set("views", path.join(`${dir_name}\\resources`, "views"));
        app.use("/public", express.static(path.join(dir_name, 'public')));
        app.use("/css", express.static(path.join(`${dir_name}\\resources`, 'css')));
        app.use("/js", express.static(path.join(`${dir_name}\\resources`, 'js')));
    }

    const db = connect(dbSetup);
    return app;
}