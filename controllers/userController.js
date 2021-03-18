const { user } = require("../models/user");
const jwt = require("jsonwebtoken");

module.exports = {
    login: async (req, res) => {
        const userInfo = await user.findOne({
            where: { email: req.body.email, password: req.body.password }
        })
        if(!userInfo){
            res.status(404).json({
                'message': 'Invalid user'
            })
        } else{
            const payload = {
                ...userInfo.dataValues
            }
            delete payload.password;
            delete payload.createdAt;
            delete payload.updatedAt;

            const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET, { expiresIn: '1d' });
            const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET, { expiresIn: '7d' });

            res.cookie('refreshToken', refreshToken, {
                domain: 'yonyeosuk.link',
                path: '/',
                sameSite: 'none',
                httpOnly: true
            })
            res.status(200).json({
                data: payload,
                accessToken: accessToken,
                message: 'Successfully signed in!'
            })
        
        }
        res.status(500).json({
            message: 'Server error has occured'
        })
    },
    signup: async (req, res) => {
        // email, pw, nickname
        const { email, password, nickname } = req.body
        user.findOne({
            where: {
                email: email
            }
        })
        .then((userInfo) => {
            if (userInfo) {
                res.status(409).json({
                    message: '이미 존재하는 이메일입니다.'
                })
            } else {
                user.create({
                    email: email,
                    password: password,
                    nickname: nickname            
                })
                .then((createdUserInfo) => {
                    if (createdUserInfo) {
                        res.status(201).json({
                            message: 'Successfully signed up!'
                        })
                    } 
                })
                .catch(err => console.log(err))
            }
        })
    },
    signout: async (req, res) => {
        const authorization = req.headers['authorization'];
        if(authorization){
            const accessToken = req.headers.split(' ')[1];
            jwt.verify(accessToken, process.env.ACCESS_SECRET, async(error, decoded) => {
                if(error){
                    res.status(401).json({
                        message: 'Invalid access token'
                    })
                } else{
                    const user = await user.findOne({
                        where: { id: decoded.id }
                    })
                    if(!user){
                        res.status(404).json({
                            message: 'Invalid user' 
                        })
                    } else{
                        res.clearCookie('refreshToken');
                        res.status(200).json({
                            message: 'Successfully signed out!'
                        })
                    }
                }
            })
        }
        res.status(500).json({
            message: 'Server error has occurred'
        })
        
    },
    socialLogin: async (req, res) => {
        
    },
    myPageInfo: async (req, res) => {
        
    },
    getUserPostList: async (req, res) => {
        
    }
}