const mailConfig = {
    nodemailer: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        auth: { 
            user: 'youremail@gmail.com',
            pass: 'password'
        },
        connection: 'nodemailer',
        port: '587', // 587, 465
        secure: true, // true for 465 and false for others
        sender_email: 'majoyeogbe4alpha@gmail.com'
    },
};

const setupMail = (env) => {
    mailConfig[env.MAIL_DRIVER]['host'] = env.MAIL_HOST || mailConfig[env.MAIL_DRIVER]['host'];
    mailConfig[env.MAIL_DRIVER]['auth']['user'] = env.MAIL_USER || mailConfig[env.MAIL_DRIVER]['auth']['user'];
    mailConfig[env.MAIL_DRIVER]['auth']['pass'] = env.MAIL_PASSWORD || mailConfig[env.MAIL_DRIVER]['pass'];
    mailConfig[env.MAIL_DRIVER]['connection'] = env.MAIL_CONNECTION || mailConfig[env.MAIL_DRIVER]['connection'];
    mailConfig[env.MAIL_DRIVER]['port'] = env.MAIL_PORT || mailConfig[env.MAIL_DRIVER]['port'];
    mailConfig[env.MAIL_DRIVER]['secure'] = mailConfig[env.MAIL_DRIVER]['port'] == '465' ? true : false;

    if (mailConfig[env.MAIL_DRIVER]['service']) {
        mailConfig[env.MAIL_DRIVER]['service'] = env.MAIL_SERVICE || mailConfig[env.MAIL_DRIVER]['service'];
    }

    if (mailConfig[env.MAIL_DRIVER]['sender_email']) {
        mailConfig[env.MAIL_DRIVER]['sender_email'] = env.MAIL_SENDER_EMAIL || mailConfig[env.MAIL_DRIVER]['sender_email'];
    }

    return mailConfig
}

exports.mail = (env) => {
    const mailConfig = setupMail(env);
    return mailConfig[env.MAIL_DRIVER];
}

exports.setupMail = (env) => {
    return setupMail(env);
}