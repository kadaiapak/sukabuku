const asyncHandler = require('express-async-handler')
const Order = require('../model/orderModel')


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

module.exports = saveOrder