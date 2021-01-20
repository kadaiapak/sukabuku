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
            error : "Fill all the field"
        })
    }
    const userExist = await User.findOne({email})
    if(userExist){
        res.status(400).json({
            error : 'Email already exists'
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
            error : 'Invalid user data'
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

const updateUser = asyncHandler(async(req, res) =>{
    const user = await User.findById(req.user._id)
    const { name, email, password } = req.body
    if(user){
    user.name = name || user.name
    user.email = email || user.email
    if(password) {
        user.password = password
    }

    const savedUser = await user.save()

    res.json({
        _id : savedUser._id,
        name : savedUser.name,
        email : savedUser.email,
        isAdmin : savedUser.isAdmin,
        token: generateToken(savedUser._id)
    })
}
    else {
        res.status(404).json({
            error : 'User not found'
        })
    }
})

module.exports = {registerUser,authUser,getUserProfile, updateUser}