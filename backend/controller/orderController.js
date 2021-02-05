const asyncHandler = require('express-async-handler')
const Order = require('../model/orderModel')


//  @desc       Save a order by user
//  @route      POST /api/orders
//  @access     Privat
const saveOrder = asyncHandler(async(req,res) => {
    const { orderItems,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
            } = req.body

    if(orderItems && orderItems.length === 0){
        res.status(400)
        throw new Error('No order item')
        return
    }else {
        const orderSave = new Order({
                orderItems,
                user:req.user._id,
                shippingAddress,
                paymentMethod,
                itemsPrice,
                taxPrice,
                shippingPrice,
        })
        const savedOrder = await orderSave.save()
        res.status(201).json(savedOrder)
    }

})


//  @desc       Get a single user by id
//  @route      GET /api/orders/:id
//  @access     Privat
const getOrderById = asyncHandler(async(req,res) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email')
    if(order){
        res.json(order)
    }else{
        res.status(404)
        throw new Error('Order not found')
    }
})

//  @desc       Get all orders only by admin
//  @route      GET /api/orders
//  @access     Private, Admin
const getAllOrders = asyncHandler(async(req,res) => {
    const orders = await Order.find({})
    if(!orders){
        res.status(404)
        throw new Error('Order not found')
    }else {
        res.json(orders)
    }
})
module.exports = { saveOrder, getOrderById, getAllOrders }