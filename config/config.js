const dotenv = require('dotenv');
dotenv.config();
const config = {
    development: {
        host: process.env.DATABASE_HOST,
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: 'thiscook_server',
        dialect: 'mysql',
        logging: false,
        port: 3306
    }
}
module.exports = config;
