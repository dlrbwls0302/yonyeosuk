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
            'message': 'Server error has occured'
        })
    },
    signup: async (req, res) => {
        
    },
    signout: async (req, res) => {
        
    },
    socialLogin: async (req, res) => {
        
    },
    myPageInfo: async (req, res) => {
        
    },
    getUserPostList: async (req, res) => {
        
    }
}