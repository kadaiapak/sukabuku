const asyncHandler = require('express-async-handler')
const User = require('../model/userModel')
const generateToken = require('../utils/generateToken')


//  @desc       Register new user
//  @route      POST /api/users
//  @access     Public   
const registerUser = asyncHandler(async (req,res) => {
    const {name, email, password} = req.body
    if(!name || !email || !password){
        res.status(400)
        throw new Error('Fill all the field')
    }
    const userExist = await User.findOne({email})
    if(userExist){
        res.status(400)
        throw new Error('User already exist')
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
        res.status(400)
        throw new Error('invalid user data')
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
        res.status(401)
        throw new Error('invalid email or password')
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
        res.status(404)
        throw new Error('User not found')
    }
})


//  @desc       Update User Profile
//  @route      PUT /api/users/profile
//  @access     Private 
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
        res.status(404)
        throw new Error('User not found')
    }
})


//  @desc       Get all user
//  @route      GET /api/users
//  @access     Private, Admin
const getAllUsers = asyncHandler(async(req,res) => {
    const users = await User.find({})
        res.json(users) 
})


//  @desc       Delete a user
//  @route      DELETE /api/users/:id
//  @access     Private, Admin
const deleteUser = asyncHandler(async(req, res) => {
    const user = await User.findById(req.params.id)
    if(user){
        await user.remove()
        res.json({
            message : "User has removed"
        })
    }else{
        res.status(404)
        throw new Error('User not found')
    }
}) 

//  @desc       Get a single user by id administrator
//  @route      GET /api/users/:id
//  @access     Private, Admin
const getSingleUserByAdmin = asyncHandler(async(req, res) => {
    const user = await User.findById(req.params.id).select('-password')
    if(user){
        res.json(user)
    }else{
        res.status(404)
        throw new Error('User not found')
    }
}) 

//  @desc       Edi a single user by id administrator
//  @route      PUT /api/users/:id
//  @access     Private, Admin
const editSingleUserByAdmin = asyncHandler(async(req, res) => {
    const user = await User.findById(req.params.id).select('-password')
    if(user){
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.isAdmin = req.body.isAdmin
        
        const updatedUser = await user.save()
        res.json({
            _id : updatedUser._id,
            name : updatedUser.name,
            email : updatedUser.email,
            isAdmin : updatedUser.isAdmin
        })

    }else{
        res.status(404)
        throw new Error('User not found')
    }
}) 


module.exports = {registerUser,authUser,getUserProfile, updateUser, getAllUsers, deleteUser, getSingleUserByAdmin, editSingleUserByAdmin}