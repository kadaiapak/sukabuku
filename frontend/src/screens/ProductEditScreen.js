import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { editProductAction, listProductDetails } from '../actions/productActions'
import { EDIT_PRODUCT_RESET } from '../constants/productConstants'

const ProductEditScreen = ({ match, history }) => {
  const productId = match.params.id

  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState('')
  const [countInStock, setCountInStock] = useState(0)
  const [image, setImage] = useState('')
  const [description, setDescription] = useState('')
  const [uploading, setUploading] = useState(false)

  const dispatch = useDispatch()

  // mendapatkan data product yang akan ditampilkan
  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  // mendapatkan token agar bisa dicek apakah dia itu admin atau bukan
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  // mendapatkan data succes edit dan error edit pada edit product reducer
  const productEdit = useSelector(state => state.productEdit)
  const {success : successEdit, error:errorEdit, loading:loadingEdit} = productEdit

  useEffect(() => {
      //pertama cek apakah dia admin
      if(userInfo && userInfo.isAdmin ){
        // cek selanjutnya apakah sudah success di edit
        if(successEdit){
        // dispatch edit product reset, agar success pada editProduct reducer ter reset, dan kita bisa mengunjungi halaman edit product
        // , jika tidak seperti itu maka kita akan terlempar kembali ke halaman productlist  setiap kali kita mencoba pergi ke halaman
        // edit product screen, karena sudah ada success value pada edit product action yang mengakibatkan kita tidak bisa 
        // mengunjungi halaman edit product, soalnya dihalaman edit product pada saat komponen tersebut pertama kali di render
        // (pada useEffect) dia akan cek apakah ada value successEdit, jika ada maka tidak boleh kunjungi halaman itu, 
        // lemparkan kembali ke halaman product list screen
        dispatch({
          type : EDIT_PRODUCT_RESET
      })
          history.push('/admin/productlist')
        }
        // cek apakah sudah ada product yang terpanggil oleh action
        if (!product.name || product._id !== productId) {
          // jika belum ada, maka panggil product pakai action
          dispatch(listProductDetails(productId))
        } else {
          // catatan disini, apabila pada product details reducer, pada saat switch PRODUCT_DETAILS_REQUEST nya tidak ditambahkan
          // return {..state}, maka pada saat komponen cek apakah ada product.name maka terjadi error, karna state tidak kenal apa itu product.name
          // jika ditambahkan return seperti di atas, maka state product pada productDetails reducer otomatis mengembalikan value state secara default 
          
          // jika sudah ada product yang terpanggil oleh action maka set state berdasarkan data product
          setName(product.name)
          setBrand(product.brand)
          setPrice(product.price)
          setCategory(product.category)
          setImage(product.image)
          setDescription(product.description)
          setCountInStock(product.countInStock)
        }
      }else {
        // jika bukan admin maka pindahkan ke halaman login
        history.push('/login')
      }
  }, [dispatch, history, productId, product, userInfo, successEdit])

  
  const submitHandler = (e) => {
    e.preventDefault()
    
    // dispatc action product edit, untuk mengirimkan data product yang sudah kita edit ke dalam database
    dispatch(editProductAction({
      _id : productId,
      name,
      price,
      image,
      brand,
      category,
      description,
      countInStock
    }))
  }

  // fungsi untuk upload image
  const uploadFileHandler = async(e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)

    try {
      const config = {
        headers : {
          'Content-Type': 'multipart/form-data'
        }
      }

      const { data } = await axios.post('/api/upload', formData, config)
      setImage(data)
      console.log(data)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }
  return (
    <>
      <Link to='/admin/productlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {loadingEdit && <Loader />}
        {errorEdit && <Message variant='danger'>{errorEdit}</Message>}
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
                    onChange={(e)=> setImage(e.target.value)}>
                </Form.Control>
                <Form.File
                  id='image-file'
                  label='Choose Image'
                  custom
                  onChange={uploadFileHandler}>
                </Form.File>
                  {uploading && <Loader />}
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
