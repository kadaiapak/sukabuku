const express = require('express')
const { saveOrder, getOrderById, getAllOrders, updateOrderToPaid, getMyOrder, updateOrderToDeliver} = require('../controller/orderController')
const { protect, admin } = require('../middleware/authMiddleware')

const router = express.Router()

router.route('/').post(protect, saveOrder).get(protect, admin, getAllOrders)
router.route('/myorders').get(protect, getMyOrder)
router.route('/:id').get(protect, getOrderById)
router.route('/:id/pay').put(protect, updateOrderToPaid)
router.route('/:id/deliver').put(protect, admin, updateOrderToDeliver)
module.exports = router