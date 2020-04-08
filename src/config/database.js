module.exports = {
    development: {
        database: process.env.DB_SCHEMA || 'database_development',
        username: process.env.DB_USERNAME || 'root',
        password: process.env.DB_PASSWORD || 'root',
        options: {
            host: process.env.DB_HOST || 'localhost',
            dialect: 'mysql',
            logging: false,
        }
    },
    test: {
        database: process.env.DB_SCHEMA || 'database_development',
        username: process.env.DB_USERNAME || 'root',
        password: process.env.DB_PASSWORD || 'root',
        options: {
            host: process.env.DB_HOST || 'localhost',
            dialect: 'mysql',
            logging: false,
        }
    },
    production: {
        database: process.env.DB_SCHEMA || 'database_production',
        username: process.env.DB_USERNAME || 'root',
        password: process.env.DB_PASSWORD || 'root',
        options: {
            host: process.env.DB_HOST || 'localhost',
            dialect: 'mysql',
            logging: false,
        }
    },

    
};
