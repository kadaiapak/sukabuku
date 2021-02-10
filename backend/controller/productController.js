const asyncHandler = require('express-async-handler')
const Product = require('../model/productModel')


// @desc    Fetch All Products
// @route   GET /api/products
// @access  Public
const getAllProduct = asyncHandler(async(req, res) => {
    const products = await Product.find()
     res.json(products)
})

// @desc    Fetch Single Products By Id
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async(req,res) => {
    const product = await Product.findById(req.params.id)
    if(product) {
        res.json(product)
    }else {
        res.status(404)
        throw new Error('Product Not Found Coba')
    }
})

// @desc    Delete product by id
// @route   Delete /api/products/:id
// @access  Private
//  kita buat functionnya
const deleteProduct = asyncHandler(async(req, res) => {
    // kita cari product nya
    const product = await Product.findById(req.params.id)
    if(product){
        product.remove()

        // kita kirimkan respon, kalau tidak maka akan loading terus terusan
        res.json({
            message : 'product remove'
        })
    } else {
        res.status(401)
        throw new Error('No product found')
    }
})



// @desc    Fetch Single Products By Category
// @route   GET /api/products/:category
// @access  Public

// testing
const getProductByCategory = asyncHandler(async(req,res) => {
    const { category } = req.params
    const products = await Product.find({category})
    if(products) {
        res.json(products)
    }else {
        res.status(404)
        throw new Error('product not found') 
    }
})


// @desc    Fetch Single Products By Category
// @route   GET /api/products/:category
// @access  Public

// testing
const getProductCategory = asyncHandler(async(req,res) => {
    const {allCategory} = req.params
    const category = await Product.distinct(allCategory)
    if(category) {
        res.json(category)
    }else {
        res.status(404)
        throw new Error('no category yet') 
    }
})


module.exports = {getAllProduct, getProductById, deleteProduct, getProductByCategory, getProductCategory}