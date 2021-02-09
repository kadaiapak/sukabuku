const express = require('express')
const { saveOrder, getOrderById, getAllOrders, updateOrderToPaid, getMyOrder} = require('../controller/orderController')
const { protect, admin } = require('../middleware/authMiddleware')

const router = express.Router()

router.route('/').post(protect, saveOrder).get(protect, admin, getAllOrders)
router.route('/myorders').get(protect, getMyOrder)
router.route('/:id').get(protect, getOrderById)
router.route('/:id/pay').put(protect, updateOrderToPaid)
module.exports = router