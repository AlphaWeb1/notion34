const {database} = require('../../config/database'),
    env = require('dotenv');

env.config();
const dbSetup = database(process.env);

const connect = (dbSetup) => {
    let connection =  undefined;
    if (dbSetup?.connection) {
        const db = require(dbSetup.connection);
        switch (dbSetup?.connection){
            case 'mongoose':
                connection = db.connect(
                    dbSetup?.path,
                    {useUnifiedTopology: true, useNewUrlParser: true},
                    (err) => {
                        if (err) throw err;
                        console.log("MongoDB Connection -- Ready state is:", db.connection.readyState);
                    }
                );
                break;
            case 'mysql':
                connection = db.createConnection(dbSetup);
                connection.connect((err) => {
                    if (err) throw err;
                    console.log('Connected to MySQL Server!');
                });
                break;
            default:
                connection = db.createConnection(dbSetup);
                connection.connect((err) => {
                    if (err) throw err;
                    console.log('Connected to MySQL Server!');
                });
                break;
        }
    }
    return connection;
}

module.exports = {
    connect,
    dbSetup,
}