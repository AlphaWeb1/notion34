const {database} = require('./database');

exports.config = (env) =>{
    database(env);
}