const { board } = require('../models');
module.exports = {
    serachPost: async (req, res) => {
        const { query } = req.body;
        if (query.length !== 0) {
            board.findAll()
            .then(response => {
                return response.dataValues
            })
            .then(posts => {
                let filteredPosts = posts
                for (let i = 0; i < query.length; i += 1) {
                    filteredPosts = filteredPosts.filter(post => post.title.includes(query[i]))
                }
                return filteredPosts;
            })
            .then(finalPosts => {
                res.status(200).json({
                    searchList : finalPosts
                })  
            })
            .catch(err => {
                if (err) console.log(err);
                res.status(500).json({
                    message: 'Server error has occurred!'
                })
            })
        } else {
            res.status(400).json({
                message: '검색어를 제대로 입력해주세요!'
            })
        }
    }
}