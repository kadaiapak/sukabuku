const User = require('../model/userModel')
const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')

const protect = asyncHandler(async(req,res,next) => {
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await User.findById(decoded.id)
            next()
        } catch (error) {
            console.error(error)
            res.status(401).json({
                error : "no authorized, token salah"
            })
        }
    }
    if(!token){
        res.status(401).json({
            error : "No Token Found"
        })  
    }


})
module.exports = protect