const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const productRoute = require('./routes/productRoute')
const userRoute = require('./routes/userRoute')

dotenv.config()

connectDB()

const app = express();
app.use(express.json())

app.get('/',(req,res) => {
    res.send ('API Running ....')
})   

app.use('/api/products', productRoute)
app.use('/api/users', userRoute)

const PORT = process.env.PORT || 5000

app.listen(PORT,console.log(`server running in ${process.env.NODE_ENV} port ${PORT}`));