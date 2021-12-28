const path = require('path');

exports.success = (res, code, message = null, data = {}, template = null) => {
    console.log('[:] Response Called', res.headers.render);
    if (res.headers.render == 'json') {
        return res.status(code).json({code, success: true, message, data});
    } else {
        return res.render(template, data);
    }
}

exports.failed = (res, code, error = null, errors = {}, template = null) => {
    console.log('[:] Response Called', res.headers.render);
    if (res.headers.render == 'json') {
        return res.status(code).json({code, success: false, error, errors});
    } else {
        return res.render(template, errors);
    }
}