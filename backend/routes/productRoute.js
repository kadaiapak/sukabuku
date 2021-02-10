const express = require('express')
const { getAllProduct, getProductById, getProductByCategory, getProductCategory, deleteProduct } = require('../controller/productController')
const router = express.Router()
const { protect, admin } = require('../middleware/authMiddleware')


router.route('/').get(getAllProduct)
router.route('/:id').get(getProductById).delete(protect, admin, deleteProduct)

//testing
router.route('/:category').post(getProductByCategory)
router.route('/getcategory').post(getProductCategory)

module.exports = router