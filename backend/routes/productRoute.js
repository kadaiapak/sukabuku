const express = require('express')
const { getAllProduct, getProductById, getProductByCategory, getProductCategory, deleteProduct, createProduct, updateProduct } = require('../controller/productController')
const router = express.Router()
const { protect, admin } = require('../middleware/authMiddleware')


router.route('/').get(getAllProduct).post(protect, admin, createProduct)
router.route('/:id').get(getProductById).delete(protect, admin, deleteProduct).put(protect, admin, updateProduct)

//testing
// router.route('/:category').post(getProductByCategory)
// router.route('/getcategory').post(getProductCategory)

module.exports = router