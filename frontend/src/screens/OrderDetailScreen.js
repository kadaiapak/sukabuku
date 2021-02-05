import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getOrderDetail } from '../actions/orderAction'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { ListGroup, Row, Col, Image } from 'react-bootstrap'
import { Link } from 'react-router-bootstrap'


const OrderDetailScreen = ({match}) => {
    const dispatch = useDispatch()

    const orderId = match.params.id

    const orderDetails = useSelector(state => state.orderDetails)
    const { loading, order, error } = orderDetails
    
    useEffect(() => {
        dispatch(getOrderDetail(orderId))
        
    }, [dispatch, orderId])

    return ( 
    loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : 
        <>
            <h1>Order : {order._id}</h1>
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Address : </strong>
                                {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <strong>Method :</strong>
                            {order.paymentMethod}  
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Order Item</h2>
                            {order.orderItems.length === 0 ? ( <Message variant='danger'>Your Order is Empty</Message> ): (
                                <ListGroup variant='flush'>
                                    {order.orderItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image src={item.image} fluid rounded alt={item.name} />
                                                </Col>
                                                <Col>
                                                    <Link to={`/product/${item.product}`}>
                                                    {item.name}
                                                    </Link>
                                                </Col>
                                                <Col md={4}>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}></Col>
            </Row>
        </>
        
    
    )    
}

export default OrderDetailScreen
