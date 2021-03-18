const express = require('express');
const router = express.Router();

router.get('/login', (req, res) => {
    res.send('연결되었습니다')
})

router.get('/signout', (req, res) => {
    res.send('연결되었습니다')
})

router.get('/signup', (req, res) => {
    res.send('연결되었습니다')
})

router.get('/social-login', (req, res) => {
    res.send('연결되었습니다')
})

router.get('/:id/info', (req, res) => {
    res.send('연결되었습니다')
})

router.get('/:id/postlist', (req, res) => {
    res.send('연결되었습니다')
})

module.exports = router;