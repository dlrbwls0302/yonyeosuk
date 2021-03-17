const express = require('express');
const router = require('./Routes');
const cors = require('cors');
const controller = require('./controllers');

const app = express();
const port = 5000;

app.use(cors()); // 설정은 나중에
app.use(express.json());

// 서버 연결 성공시
app.get('/', (req, res) => {
    res.status(200).json({
        response: '연결에 성공하였습니다!'
    })
})

module.exports = app.listen(port, () => {
    console.log(`Server is starting on ${port}`);
})

const dotenv = require('dotenv');
dotenv.config();

development: {
    host: process.env.DATABASE_HOST,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: 'thiscook_server',
    dialect: 'mysql',
    logging: false,
    port: 3306
}