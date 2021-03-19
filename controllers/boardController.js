const { image } = require("../models");
const { board } = require("../models");

module.exports = {
    getBoard: async (req, res) => {

    },
    getPost: async (req, res) => {
        
    },
    writePost: async (req, res) => {
        const { title, description } = req.body
        if (title && description) {
            const usersPostId = await board.create({
                title: title,
                description: description,
                users_id: req.params.id
            })
            res.send('testing')
            console.log(usersPostId)

            const images = req.files;
            const path = images.map(image => {
                return {
                    image: image.path,
                    board_id: usersPostId
                }
            });
            //[{}, {}, {}]
            // path들을 데이터베이스 image 의 path필드에 넣자
            if (path.length !== 0) {
                image.bulkCreate(path)
                .then(res => {
                    res.status(201).json({
                        message: 'Successfully created!'
                    })
                })
                .catch(err => {
                    if (err) {
                        res.status(500).json({
                            message: 'Server error has occurred!'
                        })
                    }
                })
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
        //1
    }
}