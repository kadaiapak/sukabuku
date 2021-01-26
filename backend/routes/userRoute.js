const express = require('express')
const {registerUser,authUser,getUserProfile, updateUser, getAllUsers, deleteUser, getSingleUserByAdmin} = require('../controller/userController')
const {protect, admin} = require('../middleware/authMiddleware')

const router = express.Router()

router.route('/').post(registerUser).get(protect, admin, getAllUsers)
router.post('/login', authUser)
router.route('/profile').get(protect, getUserProfile).put(protect, updateUser)
router.route('/:id').delete(protect, admin, deleteUser).get(protect, admin, getSingleUserByAdmin)

module.exports = router