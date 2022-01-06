
const {mail} = require('../../config/mail'),
env = require('dotenv');

env.config();

const driver = mail(process.env);

const connect = (driver) => {
    if (driver?.connection) {
        let mail = require(driver.connection);
        let connection = null;
        switch (driver?.connection){
            case 'nodemailer':
                //configure mail here
                connection = mail.createTransport({
                    host: driver.host,
                    port: driver.port,
                    secure: driver.secure, 
                    auth: {
                        user: driver.auth.user, 
                        pass: driver.auth.pass, 
                    },
                });
                break;
            case 'log':
                connection = null; // not yet setup
                break;
            default:
                connection = null; // not yet setup
                break;
        }
        return connection;
    } else {
        return null;
    }
}

module.exports = {
    connect,
    driver,
}