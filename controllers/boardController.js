const {
    image
} = require("../models");
const {
    board
} = require("../models");
const {
    comment
} = require("../models");
const multer = require('multer');
const multerS3 = require('multer-s3');
const fs = require('fs');
const path = require('path');
const AWS = require('aws-sdk');

module.exports = {
        getBoard: async (req, res) => {
            const boardData = await board.findAll();
            if (boardData) {
                boardData.reverse();
                if (typeof req.body.page === 'number' && req.body.page < 1) {
                    res.status(404).json({
                        message: "Board does not exist."
                    })
                } else {
                    const startNum = (req.body.page - 1) * 20;
                    const endNum = startNum + 20;

                    const slicedBoards = boardData.slice(startNum, endNum);
                    const result = slicedBoards.map(slicedBoard => {
                        // console.log(slicedBoard.dataValues);
                        return {
                            id: slicedBoard.dataValues.id,
                            title: slicedBoard.dataValues.title,
                            createdAt: slicedBoard.dataValues.createdAt
                        }
                    })
                    })
                }
            } else {
                res.status(500).json({
                    message: "Server error has occurred."
                })
            }
        },

        getPost: async (req, res) => {
         /*   const { postid } = req.params;
           console.log(typeof postid);
           const postImages = await board.findByPk(postid, {
             include: [{
               model: image,
               where: {
                 boardId: postid
               }
             }]
           })
           const postComments = await board.findByPk(postid, {
             include: [{
               model: comment,
               where: {
                 boardId: postid               }
             }]
           })
         /// const post = await board.findAll();
          console.log(postImages); 
          console.log(postComments);
          if (Number(postid) >= 1) {
            
         /* board.findByPk(5, {
                    attributes: ['title', 'description'],
                    include: [{
                        model: image,
                        attributes: ['id', 'image'],
                        where: {
                            boardId: postid
                        }
                    }, {
                        model: comment,
                        attributes:  ['id', 'description', 'comment_like', 'comment_dislike'],
                        where: {
                            boardId: postid
                        }
                    }]
            })
            .then(response => {
                console.log(response)
            })
            .catch(err => {
              console.log(err);
            })*/
         
    },

    writePost: async (req, res) => {
        const { title, description } = req.body
        if (title && description) {
            const usersPostId = await board.create({
                title: title,
                description: description,
                userId: req.params.id
            })
            const imageInfo = req.files;
            console.log(req.files);
            if (imageInfo) {
                const imagePath = imageInfo.map(image => {
                    return {
                        image: image.location,
                        boardId: usersPostId.dataValues.id
                    }
                });
                
                const images = await image.bulkCreate(imagePath)
                if (images[0].dataValues.id) {
                    res.status(201).json({
                        message: 'Successfully created!'
                    })
                } else {
                    res.status(500).json({
                        message: 'Server error has occurred!'
                    })
                }
                
            } else {
                res.status(201).json({
                    message: 'Successfully created but images are none'
                })
            }
        } else {
            res.status(400).json({
                message: "제목과 본문은 필수 항목입니다!"
            })
        }
    },

    updatePost: async (req, res) => {
            //1
    },

    deletePost: async (req, res) => {
        const {
            postid
        } = req.params;
        board.findOne({
                where: {
                    id: postid
                }
            })
            .then(response => {
                if (response) {
                    board.destroy({
                            where: {
                                id: postid
                            }
                        })
                        .then(response2 => {
                            if (response2 === 1) {
                                res.status(200).json({
                                    message: 'Successfully deleted!'
                                })
                            }
                        })
                        .catch(err => {
                            console.log(err)
                            res.status(500).json({
                                message: 'Server error has occurred.'
                            })
                        })
                } else {
                    res.status(404).json({
                        message: 'post does not exist'
                    })
                }
            })
        // res.send('잘 삭제되었습니다!');
    }
}
