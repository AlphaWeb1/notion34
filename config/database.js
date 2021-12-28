let config = {
    mysql: {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'properties',
        connection: 'mysql',
        port: '3306'
    },
    mongodb: {
        host: 'mongodb+srv',
        user: 'root',
        url: 'mongodb+srv://<forge_username>:<forge_password>@cluster0.eetsx.mongodb.net/<forge_dbname>',
        password: 'Pr0p3rt13s',
        database: 'properties',
        connection: 'mongoose',
        cluster: 'properties.uqcgt.mongodb.net',
        port: '',
        path: 'forge_path'
    }
};

const setupDatabase = (env) => {
    config[env.DATABASE_DRIVER]['host'] = env.DATABASE_HOST || config[env.DATABASE_DRIVER]['host'];
    config[env.DATABASE_DRIVER]['user'] = env.DATABASE_USER || config[env.DATABASE_DRIVER]['user'];
    config[env.DATABASE_DRIVER]['password'] = env.DATABASE_PASSWORD || config[env.DATABASE_DRIVER]['password'];
    config[env.DATABASE_DRIVER]['database'] = env.DATABASE_NAME || config[env.DATABASE_DRIVER]['database'];
    config[env.DATABASE_DRIVER]['connection'] = env.DATABASE_CONNECTION || config[env.DATABASE_DRIVER]['connection'];
    config[env.DATABASE_DRIVER]['port'] = env.DATABASE_PORT || config[env.DATABASE_DRIVER]['port'];

    if (config[env.DATABASE_DRIVER]['url']) {
        config[env.DATABASE_DRIVER]['url'] = env.DATABASE_URL || config[env.DATABASE_DRIVER]['url'];
    }

    if (config[env.DATABASE_DRIVER]['cluster']) {
        config[env.DATABASE_DRIVER]['cluster'] = env.DATABASE_CLUSTER || config[env.DATABASE_CLUSTER]['cluster'];
    }


    if ((['mongodb', 'mongoose'].includes(env.DATABASE_DRIVER))) {
        config[env.DATABASE_DRIVER]['path'] = `${env.DATABASE_HOST}://${env.DATABASE_USER}:${env.DATABASE_PASSWORD}@${env.DATABASE_CLUSTER}/${env.DATABASE_NAME}`;
    }

    return config;
};

exports.database = (env) => {
    const config = setupDatabase(env);
    return config[env.DATABASE_DRIVER];
}

exports.setupDatabase = (env) => {
    return setupDatabase(env);
}