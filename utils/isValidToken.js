const { user } = require("../models");
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
dotenv.config()

module.exports = {
    isValidToken: async (req, res, next) => {
        const authorization = req.headers['authorization'];
        if (authorization) {
            const accessToken = authorization.split(' ')[1];
            const decoded = jwt.verify(accessToken, process.env.ACCESS_SECRET, async (err, decoded) => {
               if (err) {
                  res.status(401).json({
                      message: 'Invalid access token'
                  })
               } else {
                 const userInfo = await user.findOne({
                     where: { id: decoded.id }
                 })
                 if (!userInfo) {
                     res.status(404).json({
                         message: 'User does not exist'
                     })
                 } else {
                   next()
                 }
              }
           }) 
        } else {
            res.status(401).json({
                message: 'Invalid access token'
            })
        }
    }
}

