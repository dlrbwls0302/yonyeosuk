const { image } = require("../models");
const { board } = require("../models");

module.exports = {
    getBoard: async (req, res) => {
        const boardData = await board.findAll();
        if(boardData){
            boardData.reverse();
            if(typeof req.body.page === 'number' && req.body.page < 1){
                res.status(404).json({
                    message: "Board does not exist."
                })
            } else {
                const startNum = (req.body.page - 1) * 20;
                const endNum = startNum + 20;

                const slicedBoards = boardData.slice(startNum, endNum);
                const result = slicedBoards.map(slicedBoard => {
                    console.log(slicedBoard.dataValues);
                    return {
                        id: slicedBoard.dataValues.id,
                        title: slicedBoard.dataValues.title,
                        createdAt: slicedBoard.dataValues.createdAt
                    }
                })
                res.status(200).json({
                    board: result
                })
            }
        } else{
            res.status(500).json({
                message: "Server error has occurred."
            })
        }
    },

    getPost: async (req, res) => {
        const { postid } = req.params;
        board.findOne({ 
            include: [{
                model: image,
                attributes: ['id', 'image'],
                where: {
                    board_id: postid
                }
            }],
            where: {
                id: postid
            }
        })
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        })
    },
    
    writePost: async (req, res) => {
        const { title, description } = req.body
        if (title && description) {
            const usersPostId = await board.create({
                title: title,
                description: description,
                users_id: req.params.id
            })
	   // console.log(usersPostId)
            const images = req.files;
            if (images) {
                const path = images.map(image => {
                    return {
                        image: image.path,
                        board_id: usersPostId.dataValues.id
                    }
                });
		console.log(path)
                if (path.length !== 0) {
                   const images = await image.bulkCreate(path)
                   if (images[0].dataValues.id) {
                      res.status(201).json({
                          message: 'Successfully created!'
                      })
                   } else {
                     res.status(500).json({
                         message: 'Server error has occurred!'
                     })
                   }
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
        //1//
    }
}
