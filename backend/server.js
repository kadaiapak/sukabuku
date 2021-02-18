const express = require('express');
const dotenv = require('dotenv');
const path = require('path')
const morgan = require('morgan')
const connectDB = require('./config/db');
const productRoute = require('./routes/productRoute')
const userRoute = require('./routes/userRoute')
const orderRoute = require('./routes/orderRoute')
const uploadRoute = require('./routes/uploadRoute')
const { notFound, errorHandler } = require('./middleware/errorMiddleware')

dotenv.config()

connectDB()

const app = express();

if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}
app.use(express.json())

app.get('/',(req,res) => {
    res.send ('API Running ....')
})   

app.use('/api/products', productRoute)
app.use('/api/users', userRoute)
app.use('/api/orders', orderRoute)

app.use('/api/upload', uploadRoute)

app.get('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID))

// const __dirname = path.resolve()  == error jika __dirname kita declare kembali
const folder = path.resolve()
app.use('/uploads', express.static(path.join(folder, '/uploads')));
// ini yang error
// app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT,console.log(`server running in ${process.env.NODE_ENV} port ${PORT}`));