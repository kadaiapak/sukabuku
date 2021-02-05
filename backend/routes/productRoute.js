const express = require('express')
const { getAllProduct, getProductById, getProductByCategory, getProductCategory } = require('../controller/productController')
const router = express.Router()


router.route('/').get(getAllProduct)
router.route('/:id').get(getProductById)

//testing
router.route('/:category').post(getProductByCategory)
router.route('/getcategory').post(getProductCategory)

module.exports = router