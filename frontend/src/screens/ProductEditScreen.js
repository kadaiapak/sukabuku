import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { listProductDetails } from '../actions/productActions'

const ProductEditScreen = ({ match, history }) => {
  const productId = match.params.id

  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState('')
  const [countInStock, setCountInStock] = useState(0)
  const [image, setImage] = useState('')
  const [description, setDescription] = useState('')

  const dispatch = useDispatch()

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  useEffect(() => {
      if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId))
      } else {
        // catatan disini, apabila pada product details reducer, pada saat switch PRODUCT_DETAILS_REQUEST nya tidak ditambahkan
        // return {..state}, maka pada saat komponen cek apakah ada product.name maka terjadi error, karna state tidak kenal apa itu product.name
        // jika ditambahkan return seperti di atas, maka state product pada productDetails reducer otomatis mengembalikan value state secara default 
        setName(product.name)
        setBrand(product.brand)
        setPrice(product.price)
        setCategory(product.category)
        setImage(product.image)
        setDescription(product.description)
        setCountInStock(product.countInStock)
      }
  }, [dispatch, history, productId, product])

  
  const submitHandler = (e) => {
    e.preventDefault()
  }

  return (
    <>
      <Link to='/admin/productlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
                
            <Form.Group controlId='price'>
                <Form.Label>Price</Form.Label>
                <Form.Control 
                type='number'
                placeholder ='Enter a product price'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                >
                </Form.Control>
            </Form.Group>

            <Form.Group controlId='countInStock'>
                <Form.Label>Count In Stock</Form.Label>
                <Form.Control
                    type='number'
                    placeholder='set count in stock'
                    value={countInStock}
                    onChange={(e)=> setCountInStock(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId='description'>
                <Form.Label>Description</Form.Label>
                <Form.Control
                    type='text'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                ></Form.Control>
            </Form.Group>

            <Form.Group controlId='category'>
                <Form.Label>Category</Form.Label>
                <Form.Control 
                    type='text'
                    placeholder='enter a product category'
                    value={category}
                    onChange={(e) => setCategory(e.target.value)} />
            </Form.Group>

            <Form.Group controlId='brand'>
                <Form.Label>Brand</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='set product brand'
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    ></Form.Control>
            </Form.Group>

            <Form.Group controlId='image'>
                <Form.Label>Images</Form.Label>
                <Form.Control
                    type='text'
                    value={image}
                    placeholder='insert an product image'
                    onChange={(e)=> setImage(e.target.value)}></Form.Control>
            </Form.Group>
            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default ProductEditScreen
