'use strict';

var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');

const configs = require('../configs');
const { DB_NAME, DB_HOST, DB_USERNAME, DB_PASSWORD } = configs.database;

var basename = path.basename(__filename);
var db = {};

const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
    host: DB_HOST,
    dialect: 'mysql',
    logging: false,
    operatorsAliases: false,
    // dialectOptions: {
    //     socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock',
    //     useUTC: true,
    // },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
    define: {
        paranoid: false,
    },
});

fs.readdirSync(__dirname)
    .filter((file) => {
        return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js';
    })
    .forEach((file) => {
        var model = sequelize['import'](path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
