const express = require('express');
const cors = require('cors');
const { user } = require('./models');
const { board } = require('./models');
//const bodyParser = require('body-parser');
// Router
const userRouter = require('./Routes/userRouter.js');
const searchRouter = require('./Routes/searchRouter.js');
const boardRouter = require('./Routes/boardRouter.js');
const app = express();
const port = 5000;

app.use(cors()); // 설정은 나중에
app.use(express.json());
//app.use(bodyParser.urlencoded({
//  extended: true
//}));

// 서버 연결 성공시
app.get('/', async (req, res) => {
   await board.findAll({
        attributes: {
            exclude: ['userId']
        },
        where: {
            users_id: 1 
        }
    })
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
