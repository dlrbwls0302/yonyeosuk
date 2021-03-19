const { user } = require("../models");
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
dotenv.config()

module.exports = {
    isValidToken: async (req, res, next) => {
        const authorization = req.headers['authorization'];
        if (authorization) {
            const accessToken = authorization.split(' ')[1];
            const decoded = jwt.verify(accessToken, process.env.ACCESS_SECRET)
            const userInfo = await user.findOne({
                where: { id: decoded.id }
            })
            if (!userInfo) {
                res.status(401).json({
                    message: 'Invalid access token'
                })
            } else {
                next()
            }            
        } 
    }
}

