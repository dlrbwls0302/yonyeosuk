const express = require('express');
const router = express.Router();
const boardController = require('../controllers/boardController'); 

router.get('/', boardController.getBoard)

router.get('/:postid', boardController.getPost)

router.post('/post/:id', boardController.writePost)

router.post('/update/:postid', boardController.updatePost)

router.post('/delete/:postid', boardController.deletePost)

module.exports = router;