const express = require('express');
const cors = require('cors');
const { board } = require('./models');
const userRouter = require('./Routes/userRouter');
const searchRouter = require('./Routes/searchRouter');
const boardRouter = require('./Routes/boardRouter');
const app = express();
const port = 5000;
const dotenv = require('dotenv')
dotenv.config()

app.use(cors()); // 설정은 나중에
app.use(express.json());
// 서버 연결 성공시
app.get('/', async (req, res) => {
    board.findAll({
        where: {
            userId: 1 
        }
    })
    .then(res => console.log(res))
    .catch(err => console.log(err))
    
    res.status(200).json({
        response: '연결에 성공하였습니다!'
    })
})

app.use('/user', userRouter);
app.use('/board', boardRouter);
app.use('/search', searchRouter);

module.exports = app.listen(port, () => {
    console.log(`Server is starting on ${port}`);
})
