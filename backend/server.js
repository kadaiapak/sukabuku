const express = require('express');
const products = require('./data/products');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config()

connectDB()

const app = express();
app.get('/',(req,res) => {
    res.send ('API Running ....')
})

app.get('/api/products', (req,res) => {
    res.json (products)
})

app.get('/api/products/:id', (req,res) => {
    const product = products.find(p => p._id === req.params.id)
    res.json(product)
})

const PORT = process.env.PORT || 5000

app.listen(PORT,console.log(`server running in ${process.env.NODE_ENV} port ${PORT}`));