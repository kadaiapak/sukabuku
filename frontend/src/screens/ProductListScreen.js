import React, { useEffect} from 'react'
import { Row, Col, Button, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { createProductAction, listProducts } from '../actions/productActions'
import { LinkContainer } from 'react-router-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
 
// import Action
import { deleteProductAction } from '../actions/productActions'
import { CREATE_PRODUCT_RESET} from '../constants/productConstants'

const ProductListScreen = ({history}) => {
    // ambil data product dari api yang sudah disediakan
    // karna sudah pernah diambil sebelumnya maka action tersebut dipakai kembali

    //mengenalkan dispatch
    const dispatch = useDispatch()

    // mengambil data user yang login untuk di cek apakah dia admin atau tidak
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    // mengambil delete product reducer untuk menggunakan fitur loading dan success
    const productDelete = useSelector(state => state.productDelete)
    const { loading:loadingDelete, success:successDelete, error:errorDelete } = productDelete

    // mengambil data create product reducer untuk fitur loading dan success
    const productCreate = useSelector(state => state.productCreate)
    const { loading:loadingCreate, success:successCreate, product:createdProduct, error:errorCreate} = productCreate

    // dispatch action product list di useEffect, agar sewaktu pertama 
    // kali component di load, product langsung terpanggil oleh action tersebut
    useEffect(() => {
        dispatch({
            type : CREATE_PRODUCT_RESET
        })

        
       //cek apakah dia admin
       if(userInfo && userInfo.isAdmin){
            if(successCreate){
                 // jika sukses create maka push ke halaman product detail untuk nantinya di edit
                 history.push(`/admin/product/${createdProduct._id}/edit`)
            }else {
                //jika belum create barang maka panggil list barang
                dispatch(listProducts())
            }
       }else {
           //jika tidak lemparkan ke halaman login
           history.push('/login')
       }
    }, [history, 
        dispatch,
        // apabila delete product sukses, maka halaman akan di reload kembali
        successDelete,
        successCreate,
        createdProduct,
        userInfo])

    // mengambil data product dari reducer yang sudah disiapkan sebelumnya menggunakan useSelector
    const productList = useSelector(state => state.productList)
    const { loading:loadingProduct , products, error:errorProduct } = productList

    // menggunakan fungsi delete product
    const deleteHandler = (id) => {
        // gunakan action delete product yang sudah kita buat
        dispatch(deleteProductAction(id))
    }

    const productCreateHandler = () => {
        dispatch(createProductAction())
    }
    return (
        <>
            <Row className='align-item-center'>
                <Col>
                    <h1>Product</h1>
                </Col>
                <Col className='text-right'>
                    <Button className='btn' variant='primary' onClick={()=> productCreateHandler()}>
                    <i className='fas fa-plus mr-2'></i>Add Product
                    </Button>
                </Col>
            </Row>
            {loadingDelete && <Loader />}
            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
            {loadingCreate && <Loader />}
            {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
            {loadingProduct ? <Loader /> : errorProduct ? <Message>{errorProduct}</Message> : (
            <Table bordered striped hover responsive className='table-sm mt-4'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Brand</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (         //mapping through all the product
                        <tr key={product._id}>
                            <td>{product._id}</td>
                            <td>{product.name}</td>
                            <td>${product.price}</td>
                            <td>{product.category}</td>
                            <td>{product.brand}</td>
                            <td>
                                <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                    <Button variant='light' className='btn-sm'>
                                        <i className='fas fa-edit'></i>
                                    </Button>
                                </LinkContainer>
                                <Button variant='danger'
                                        className='btn-sm'
                                        onClick={()=> deleteHandler(product._id)}> 
                                            <i className='fas fa-trash'></i>
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            )}   
        </>
    )
}

export default ProductListScreen
