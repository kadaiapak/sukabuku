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


// @Desc        Create Product
// @route       Post /api/products
// access       private, admin
const createProduct = asyncHandler(async(req, res) => {
    const product = new Product({
        user : req.user._id,
        name : 'sample product',
        image : '/images/sample.jpg',
        brand : 'sample brand',
        category : 'sample category',
        description : 'sample description',
        rating : 0,
        numReviews : 0,
        price : 0,
        countInStock : 0,
    })

    const createdProduct = await product.save()
    if(createdProduct){
        res.status(201).json(createdProduct)
    } else {
        res.status(401)
        throw new Error('invalid created product')
    }
})

//  @desc   Update product 
//  @route  PUT /api/products/:id
//  access  Private, Admin
const updateProduct = asyncHandler(async(req,res) => {
// cari product yang akan di update
const {name, price, image, brand, category, description, countInStock } = req.body
const product = await Product.findById(req.params.id)
if(product){
    // jika product ditemukan maka ganti valuenya dengan value baru sesuai dengan isi form
    product.name = name
    product.price = price
    product.image = image
    product.brand = brand
    product.category = category
    product.description = description
    product.countInStock = countInStock

    const saveUpdatedProduct = await product.save()
    res.status(201).json(saveUpdatedProduct)
}else {
    // jika tidak ada product tersebut maka kirim pesan
    res.status(404)
    throw new Error('product not found')
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


module.exports = {getAllProduct, getProductById, deleteProduct, createProduct, getProductByCategory, getProductCategory, updateProduct}