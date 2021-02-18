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
//  ambil ddata dari frontend
const {name, price, image, brand, category, description, countInStock } = req.body
//  cari product yang akan di update
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

// @desc    Review a product by User
// @route   POST /api/products/:id/reviews
// @access  Private
const productReview = asyncHandler(async(req,res) => {
    const { comment, rating } = req.body
    
    // find the product
    const product = await Product.findById(req.params.id)
    if(product){
        // jika product dengan id tersebut ketemu, maka 
        // selanjutnya cek, apakah orang yang mau review product sudah pernah review sebelumnya
        // karna satu orang hanya bisa review satu kali pada tiap tiap product
        const reviewedProduct = product.reviews.find(p => p.user.toString() === req.user._id.toString())
        if(reviewedProduct){
            res.status(400)
            throw new Error('You already review this product fucker, why ????')
        }

        const review = {
            user : req.user._id,
            name : req.user.name,
            comment,
            rating : Number(rating)
        }

        product.reviews.push(review)

        product.numReviews = product.reviews.length

        product.rating = product.reviews.reduce((acc,item) => item.rating + acc, 0) / product.reviews.length

        await product.save()
        res.json({message : 'Thanks for reviewing this fucking shit product'})
 
    }else {
        res.status(400)
        throw new Error('Product not fucking founding fucker')
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




module.exports = {
    getAllProduct, 
    getProductById, 
    deleteProduct, 
    createProduct, 
    getProductByCategory, 
    getProductCategory, 
    updateProduct,
    productReview}