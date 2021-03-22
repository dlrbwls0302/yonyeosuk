const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser")
const parser = bodyParser.urlencoded({
    extended: false
});
const boardController = require('../controllers/boardController');
const dotenv = require('dotenv');
dotenv.config()
const multer = require('multer');
const accessTokenMiddleware = require('../utils/isValidToken')
const multerS3 = require('multer-s3')
const AWS = require("aws-sdk");

const s3 = new AWS.S3({ 
    accessKeyId: process.env.KEYID, //노출주의
    secretAccessKey: process.env.KEY, //노출주의
    region: process.env.REGION, //노출주의
});

const storage = multerS3({ 
    s3: s3,
    bucket: 'www.yonyeosuk.link',
    contentType: multerS3.AUTO_CONTENT_TYPE, 
    acl: 'public-read',
    metadata: function (req, file, cb) {
        cb(null, { fieldName: file.fieldname })
    },
    key: function (req, file, cb) { 
        cb(null, `images/${Date.now()}_${file.originalname}`)
       
    },
})

const upload = multer({
    storage: storage
})

router.get('/', boardController.getBoard)

router.get('/:postid', boardController.getPost)

router.post('/post/:id', accessTokenMiddleware.isValidToken, upload.array('image'), parser, boardController.writePost)

router.post('/update/:postid', accessTokenMiddleware.isValidToken, upload.array('image'), parser, boardController.updatePost)

router.post('/delete/:postid', accessTokenMiddleware.isValidToken, boardController.deletePost)

module.exports = router;
