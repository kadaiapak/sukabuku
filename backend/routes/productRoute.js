const express = require('express')
const { getAllProduct, getProductById } = require('../controller/productController')
const router = express.Router()


router.route('/').get(getAllProduct)
router.route('/:id').get(getProductById)

module.exports = router