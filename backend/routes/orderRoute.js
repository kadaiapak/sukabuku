const express = require('express')
const saveOrder = require('../controller/orderController')
const { protect } = require('../middleware/authMiddleware')

const router = express.Router()

router.route('/').post(protect, saveOrder)

module.exports = router