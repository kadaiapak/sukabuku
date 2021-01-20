const express = require('express')
const {registerUser,authUser,getUserProfile, updateUser} = require('../controller/userController')
const protect = require('../middleware/authMiddleware')

const router = express.Router()

router.route('/').post(registerUser)
router.post('/login', authUser)
router.route('/profile').get(protect, getUserProfile).put(protect, updateUser)

module.exports = router