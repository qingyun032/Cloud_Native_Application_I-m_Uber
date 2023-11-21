const Sequelize = require('sequelize');


const sequelize = new Sequelize({
    database: process.env.DB_DATABASE || 'myUber_database',
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '00000000',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    pool: {
        max: 1000,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});


module.exports = sequelize;
