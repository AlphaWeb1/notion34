const path = require('path');

exports.success = (res, code, message = null, data = {}, template = null) => {
    data.request_url = res.request_url;

    console.log('[:] Response Called', {render: res.headers.render, data, code, template, message});
    if (res.headers.render == 'json') {
        return res.status(code).json({code, success: true, message, data});
    } else {
        return res.render(template, data);
    }
}

exports.failed = (res, code, error = null, errors = [], template = null) => {

    console.log('[:] Response Called', {render: res.headers.render, errors, code, template, error, request_url: res.request_url});
    if (res.headers.render == 'json') {
        return res.status(code).json({code, success: false, error, errors, request_url: res.request_url});
    } else {
        return res.status(code).render(template, {error, errors: errors, request_url: res.request_url});
    }
}

exports.redirect = (res, message = null, code = 301, success = true, data = {}, url = null) => {
    data.request_url = res.request_url;

    console.log('[:] Response Called', {render: res.headers.render, data, code, template, message, redirect_url: url});
    if (res.headers.render == 'json') {
        return res.status(code).json({code, success, message, data, redirect_url: url});
    } else {
        return res.status(code).redirect(url, data);
    }
}