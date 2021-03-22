const {
    image
} = require("../models");
const {
    board
} = require("../models");
const {
    comment
} = require("../models");

module.exports = {
        getBoard: async (req, res) => {
            const boardData = await board.findAll();
            if (boardData) {
                boardData.reverse();
                if ( req.body.page < 1) {
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
                    res.status(200).json({
                        result
                    })
                }
            } else {
                res.status(500).json({
                    message: "Server error has occurred."
                })
            }
        },

    getPost: async (req, res) => {
        const { postid } = req.params;
        if (Number(postid) >= 1) {
            const post = await board.findByPk(postid)
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
                    boardId: postid
                  }
                }]
            })
            res.status(200).json({
                post: post === null ? null : post.dataValues,
                images: postImages === null ? null : postImages.dataValues.images,
                comments: postComments === null ? null : postComments.dataValues.comments
            })
        } else {
            res.status(404).json({
                message: '해당 글을 찾을 수가 없습니다!'
            })
        }
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
        const {
            title,
            description
        } = req.body
        if (title) {
            const changedTitle = await board.update({
                title: title },{
                where: {
                    id: req.params.postid
               } 
           })
        }
        if (description) {
            const changedDes = await board.update({
                description: description },
                {
                  where: {
                    id: req.params.postid
                  }
                })
        }
        const imageInfo = req.files;
        if (imageInfo.length !== 0) {
            const usersPostId = await board.findByPk(req.params.postid)
            const imagePath = imageInfo.map(image => {
                return {
                    image: image.location,
                    boardId: usersPostId.dataValues.id
                }
            });

            image.destroy({
              where: {
                boardId: req.params.postid
              }
            })
            .then(async response => {
              const images = await image.bulkCreate(imagePath)
            if (images[0].dataValues.id) {
                res.status(201).json({
                    message: 'Successfully updated!'
                })
            } else {
                res.status(500).json({
                    message: 'Server error has occurred!'
                })
            }
         })

        } else {
            res.status(201).json({
                message: 'Successfully updated but images are none'
            })
        }
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
