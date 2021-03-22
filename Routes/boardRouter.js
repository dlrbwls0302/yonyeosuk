const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser")
const parser = bodyParser.urlencoded({
    extended: false
});
const boardController = require('../controllers/boardController');
const multer = require('multer');
const upload = multer({
    storage: multerS3({
        s3: s3, 
        bucket: 's3://www.yonyeosuk.link/images/',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        acl: 'public-read',
        key: (req, file, cb) => {
            console.log(file);
            cb(null, file.originalname)
        },
    }),
    limits: { fileSize: 5 * 1024 * 1024 }
})
const accessTokenMiddleware = require('../utils/isValidToken')

router.get('/', boardController.getBoard)

router.get('/:postid', boardController.getPost)

router.post('/post/:id', accessTokenMiddleware.isValidToken, upload.array('image'), parser, boardController.writePost)

router.post('/update/:postid', accessTokenMiddleware.isValidToken, boardController.updatePost)

router.post('/delete/:postid', accessTokenMiddleware.isValidToken, boardController.deletePost)

module.exports = router;
