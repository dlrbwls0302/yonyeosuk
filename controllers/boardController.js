module.exports = {
    getBoard: async (req, res) => {

    },
    getPost: async (req, res) => {
        
    },
    writePost: async (req, res) => {
        const { title, description } = req.body
        if (title && description) {
            const images = req.files;
            const path = images.map(image => image.path);
            // path들을 데이터베이스 image 의 path필드에 넣자
            
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