 const mongoose = require('mongoose')
 const dotenv = require('dotenv')
 const users = require('./data/users')
 const products = require('./data/products')
 const User = require('./model/userModel')
 const Product = require('./model/productModel')
 const Order = require('./model/orderModel')
 const connectDB = require('./config/db')

 dotenv.config()
 connectDB()

 const insetData = async () => {
     try {
         await Product.deleteMany();
         await User.deleteMany();
         await Order.deleteMany();

         const createdUser = await User.insertMany(users)

         const userAdmin = createdUser[0]._id
         const sampleProduct = products.map(x => {
             return {
                 ...x,
                 user : userAdmin 
             }
         })
         
         await Product.insertMany(sampleProduct)
         console.log('data inserted')
         process.exit()
        } catch (error) {
         console.error(`${error}`)
         process.exit(1)
     }
 }

 const deleteData = async () => {
    try {
        await Product.deleteMany();
        await User.deleteMany();
        await Order.deleteMany();

        console.log('data deleted')
        process.exit()
       } catch (error) {
        console.error(`${error}`)
        process.exit(1)
    }
}

if(process.argv[2] === '-d' ){
    deleteData()
} else {
    insetData()
}