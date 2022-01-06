mail = require('../connections/mail.connect');
const dayjs = require('dayjs');

exports.accountCreation = (user, data) => {
    mailer = mail.connect(mail.driver);

    if (mailer) {
        const $message = {
            from: `"${process.env.APP_NAME}" <${mail.driver.sender_email}>`, 
            to: `${user.email}`,
            subject: `Welcome Message`,
            text: `Dear, ${user.firstName}\n
            ${process.env.APP_NAME} warmly welcome you to the monst reliable home of properties.\n
            You are one step away to complete your account creation,\n
            Kindly use the OTP below to verify your email.\n
            ${data.otp}\n 
            Note that the OTP will expire in ${dayjs(data.expiredAt).format('HH:mm:ssa DD, MMM, YYYY')}\n 
            Kindly ignore if you do not make this request or contact ${mail.driver.sender_email} for security reason.`, 
            html: `<h4>Dear, ${user.firstName}</h4>
            <p>${process.env.APP_NAME} warmly welcome you to the monst reliable home of properties.</p>
            <p>You are one step away to complete your account creation,</p>
            <p>Kindly use the OTP below to verify your email.</p>
            <h3><b>${data.otp}</b></h3>
            <p>Note that the OTP will expire in ${data.expiredAt.format('HH:mm:ssa DD, MMM, YYYY')}</p>
            <p>Kindly ignore if you do not make this request or contact ${mail.driver.sender_email} for security reason.</p>`,
        };

        mailer.sendMail($message, (error, info)=>{
            if (error)
                console.log('[>] Oops! Sending Mail Failed', error);
            if (info) 
                console.log('[>] Mail sent', info);
        });
    }
}

exports.otpResend = async (user, data, type) => {
    mailer = mail.connect(mail.driver);

    const purposeMessage = getPurpose(type);
    if (mailer) {
        const $message = {
            from: `"${process.env.APP_NAME}" <${mail.driver.sender_email}>`, // sender address 
            to: `${user.email}`, // list of receivers email
            subject: `Hello ${user.firstName}`, // Subject line
            text: `Hello ${user.firstName},\n kindly find the OTP below to ${purposeMessage}.\n
            ${data.otp}\n 
            Note that the OTP will expire in ${dayjs(data.expiredAt).format('HH:mm:ssa DD, MMM, YYYY')}\n 
            Kindly ignore if you do not make this request or contact ${mail.driver.sender_email} for security reason.`, // plain text body
            html: `<p>kindly find the OTP below to ${purposeMessage}.</p>
            <h3><b>${data.otp}</b></h3>
            <p>Note that the OTP will expire in ${data.expiredAt.format('HH:mm:ssa DD, MMM, YYYY')}</p>
            <p>Kindly ignore if you do not make this request or contact ${mail.driver.sender_email} for security reason.</p>`, // html body
            // attachments: [
            //     {
            //         filename: 'attachment name display',
            //         path: 'path-to-file'
            //     },
            // ], // adding attachment
        };
        // console.log('[!] Mail Message:', $message);

        mailer.sendMail($message, (error, info)=>{
            if (error)
                console.log('[>] Oops! Sending Mail Failed', error);
            if (info) 
                console.log('[>] Mail sent', info);
        });
    }
}

const getPurpose = (type) => {
    let purpose = '';
    switch (type) {
        case 'verify-email':
            purpose = 'verify your email';
            break;
        case 'rese-password':
            purpose = 'reset your password';
            break;
        default:
            purpose = null;
            break;
    }
    return purpose;
}