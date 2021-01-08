const asyncHandler = require('express-async-handler')
const User = require('../model/userModel')
const generateToken = require('../utils/generateToken')


//  @desc       Register new user
//  @route      POST /api/users
//  @access     Public   
const registerUser = asyncHandler(async (req,res) => {
    const {name, email, password} = req.body
    if(!name || !email || !password){
        res.status(400).json({
            error : "fill all the field"
        })
    }
    const userExist = await User.findOne({email})
    if(userExist){
        res.status(400).json({
            error : 'email already exists'
        })
    } 
    const user = await User.create({
            name,
            email,
            password
        })
    if(user){
        res.status(201).json({
            _id: user._id,
            name : user.name,
            email : user.email,
            isAdmin : user.isAdmin,
            token: generateToken(user._id)
        })
    } else {
        res.status(400).json({
            error : 'invalid user data'
        })
    }
})


//  @desc       Auth user & get token
//  @route      POST /api/users/login
//  @access     Public   
const authUser = asyncHandler(async (req,res) => {
    const {email, password} = req.body
    
    const user = await User.findOne({email})
    if(user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name : user.name,
            email : user.email,
            isAdmin : user.isAdmin,
            token: generateToken(user._id)
        })
    } else {
        res.status(401).json({
            error : "invalid email or password"
        })
    }

})

//  @desc       Get user profile
//  @route      GET /api/users/profile
//  @access     Private   
const getUserProfile = asyncHandler(async (req,res) => {
    const user = await User.findById(req.user._id)
    if(user){
        res.json({
            _id: user._id,
            name : user.name,
            email : user.email,
            isAdmin : user.isAdmin
        })
    } else {
        res.status(404).json({
            error : 'user not found'
        })
    }
})



module.exports = {registerUser,authUser,getUserProfile}