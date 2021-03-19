const express = require('express');
const router = express.Router();
const boardController = require('../controllers/boardController');
const multer = require('multer');
const upload = multer({
    dest: 'uploads/'
})
const accessTokenMiddleware = require('../utils/isValidToken') 

router.get('/', boardController.getBoard)

router.get('/:postid', boardController.getPost)

router.post('/post/:id', accessTokenMiddleware.isValidToken, upload.array('image'), boardController.writePost)

router.post('/update/:postid', accessTokenMiddleware.isValidToken, boardController.updatePost)

router.post('/delete/:postid', accessTokenMiddleware.isValidToken, boardController.deletePost)

module.exports = router;