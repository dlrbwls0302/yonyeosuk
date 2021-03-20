const {
    user,
    item,
    users_item
} = require("../models");
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
dotenv.config()

module.exports = {
    login: async (req, res) => {
        const userInfo = await user.findOne({
            where: {
                email: req.body.email,
                password: req.body.password
            }
        })
        if (!userInfo) {
            res.status(404).json({
                'message': 'Invalid user'
            })
        } else {
            user.findOne({ 
                    include: [{
                        model: item,
                        attributes: ['id', 'name'],
                        through: {
                            where: {
                                userId: userInfo.dataValues.id
                            }
                        }
                    }],
                    where: {
                        id: userInfo.dataValues.id
                    }
                })
                .then(res => {
                    const items = res.dataValues.items.map(item => item.dataValues.name)
                    return items;
                })
                .then(items => {
                    const payload = {
                        ...userInfo.dataValues
                    }
                    delete payload.password;
                    delete payload.createdAt;
                    delete payload.updatedAt;
        
                    const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET, {
                        expiresIn: '1d'
                    });
                    const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET, {
                        expiresIn: '7d'
                    });
        
                    res.cookie('refreshToken', refreshToken, {
                        domain: 'yonyeosuk.link',
                        path: '/',
                        sameSite: 'none',
                        httpOnly: true
                    })
                    res.status(200).json({
                        data: {
                            ...payload,
                            items: items
                        },
                        accessToken: accessToken,
                        message: 'Successfully signed in!'
                    })
                })
                .catch(err => console.log(err))
        }

    },
    signup: async (req, res) => {
        const {
            email,
            password,
            nickname
        } = req.body
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
        res.clearCookie('refreshToken');
        res.status(200).json({
            message: 'Successfully signed out!'
        })
    },
    socialLogin: async (req, res) => {

    },
    myPageInfo: async (req, res) => {

    },
    getUserPostList: async (req, res) => {

    }
}
