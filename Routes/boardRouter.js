const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser")
const parser = bodyParser.urlencoded({extended:false});
const boardController = require('../controllers/boardController');
const multer = require('multer');
const upload = multer({
    dest: 'uploads/'
})
const accessTokenMiddleware = require('../utils/isValidToken') 

<<<<<<< HEAD
router.get('/:postid', (req, res) => {
    res.send('연결되었습니다')
})
=======
router.get('/', boardController.getBoard)
>>>>>>> test1

router.get('/:postid', boardController.getPost)

<<<<<<< HEAD
router.get('/update/:postid', (req, res) => {
    res.send('연결되었습니다')
})

router.get('/delete/:postid', (req, res) => {
    res.send('연결되었습니다')
})
=======
router.post('/post/:id', accessTokenMiddleware.isValidToken, upload.array('image'), parser, boardController.writePost)

router.post('/update/:postid', accessTokenMiddleware.isValidToken, boardController.updatePost)

router.post('/delete/:postid', accessTokenMiddleware.isValidToken, boardController.deletePost)
>>>>>>> test1

module.exports = router;
