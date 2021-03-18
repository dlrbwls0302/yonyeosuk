const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')

router.post('/login', userController.login)

router.post('/signout', userController.signout)

router.post('/signup', userController.signup)

router.post('/social-login', userController.socialLogin)

router.get('/:id/info', userController.myPageInfo)

router.get('/:id/postlist', userController.getUserPostList)

module.exports = router;