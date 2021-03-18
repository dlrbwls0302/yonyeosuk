const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('연결되었습니다')
})

router.get('/:post-id', (req, res) => {
    res.send('연결되었습니다')
})

router.get('/post/:id', (req, res) => {
    res.send('연결되었습니다')
})

router.get('/update/:post-id', (req, res) => {
    res.send('연결되었습니다')
})

router.get('/delete/:post-id', (req, res) => {
    res.send('연결되었습니다')
})

module.exports = router;