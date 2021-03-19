const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')
const accessTokenMiddleware = require('../utils/isValidToken')

router.post('/login', userController.login)

router.post('/signout', accessTokenMiddleware.isValidToken, userController.signout)

router.post('/signup', userController.signup)

router.post('/social-login', userController.socialLogin)

router.get('/:id/info', accessTokenMiddleware.isValidToken, userController.myPageInfo)

router.get('/:id/postlist', accessTokenMiddleware.isValidToken, userController.getUserPostList)

module.exports = router;