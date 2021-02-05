const express = require('express')
const { saveOrder, getOrderById, getAllOrders} = require('../controller/orderController')
const { protect, admin } = require('../middleware/authMiddleware')

const router = express.Router()

router.route('/').post(protect, saveOrder).get(protect, admin, getAllOrders)
router.route('/:id').get(protect, getOrderById)
module.exports = router