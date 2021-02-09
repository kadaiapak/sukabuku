import React, { useEffect} from 'react'
import { Row, Col, Button, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productActions'
import { LinkContainer } from 'react-router-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
 

const ProductListScreen = ({history}) => {
    // ambil data product dari api yang sudah disediakan
    // karna sudah pernah diambil sebelumnya maka action tersebut dipakai kembali

    //mengenalkan dispatch
    const dispatch = useDispatch()

    // mengambil data user yang login untuk di cek apakah dia admin atau tidak
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin


    // dispatch action product list di useEffect, agar sewaktu pertama 
    // kali component di load, product langsung terpanggil oleh action tersebut
    useEffect(() => {
        // cek apakah dia admin?
        if(userInfo && userInfo.isAdmin){
            // jika benar maka lakukan ini
            // jika benar maka panggil list product menggunakan action yang sudah dibuat sebelumnya
            // jika tidak dipanggil maka akan terjadi bug, product hanya akan tampil jika kita pernah mengunjungi halaman home,
            //  karena di halaman home lah kita pernah memanggil list product
            dispatch(listProducts())
        } else {
            // jika tidak maka lemparkan ke halaman login
            history.push('/login')
        }

    }, [history, dispatch, userInfo])

    // mengambil data product dari reducer yang sudah disiapkan sebelumnya menggunakan useSelector
    const productList = useSelector(state => state.productList)
    const { loading:loadingProduct , products, error:errorProduct } = productList

    // menggunakan fungsi delete product
    const deleteHandler = (id) => {
        console.log(`deleted ${id}`)
    }
    return (
        <>
            <Row className='align-item-center'>
                <Col>
                    <h1>Product</h1>
                </Col>
                <Col className='text-right'>
                    <Button className='btn' variant='primary'>
                    <i className='fas fa-plus mr-2'></i>Add Product
                    </Button>
                </Col>
            </Row>
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
