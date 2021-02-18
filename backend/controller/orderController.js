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
                totalPrice,
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

//@desc         Put update order to paid
//@route        Put /api/orders/:id/pay
//@access       Private

const updateOrderToPaid = asyncHandler(async(req,res) => {
    const order = await Order.findById(req.params.id)
    if(order){
        order.isPaid = true
        order.paidAt = Date.now()
        order.paymentResult = {
            id : req.body.id,
            status : req.body.status,
            update_time : req.body.update_time,
            email_address : req.body.payer.email_address
        }

        const updatedOrder = await order.save()
        res.json(updatedOrder)
    }else{
        res.status(404)
        throw new Error('Order not Found')
    }
})

//  @desc       Update order to delivered by admin
//  @route      PUT /api/order/:id/deliver
//  @access     Private, Admin

const updateOrderToDeliver = asyncHandler(async(req, res) => {
    const order = await Order.findById(req.params.id)
    if(order){
        if(order.isPaid){

            order.isDelivered = true,
            order.deliveredAt = Date.now()
            
            const updatedOrderDelivered = await order.save()
            res.json(updatedOrderDelivered)
        } else {
            res.status(400)
            throw new Error('Order isnt paid yet')
        }
    }else {
        res.status(404)
        throw new Error('Order not found')
    }
})

//  @desc       Get all orders only by admin
//  @route      GET /api/orders
//  @access     Private, Admin
const getAllOrders = asyncHandler(async(req,res) => {
    const orders = await Order.find({}).populate('user', 'id name')
    if(!orders){
        res.status(404)
        throw new Error('Order not found')
    }else {
        res.json(orders)
    }
})

// @Desc        Get order by login user
// @route       GET /api/orders/myorder
// @access      Private
const getMyOrder = asyncHandler(async(req,res) => {
    const orders = await Order.find({ user : req.user._id })
    res.json(orders)
})



module.exports = { saveOrder, getOrderById, getAllOrders, updateOrderToPaid, updateOrderToDeliver, getMyOrder }