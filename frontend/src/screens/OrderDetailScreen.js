import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { PayPalButton} from 'react-paypal-button-v2'
import { useSelector, useDispatch } from 'react-redux'
import { Col, Row, ListGroup, Image, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getOrderDetail, payOrder } from '../actions/orderAction'
import { ORDER_PAY_RESET } from '../constants/orderConstants'

const OrderDetailScreen = ({match}) => {
    const orderId = match.params.id
    
    const [sdkReady, setSdkReady] = useState(false)

    const dispatch = useDispatch()

    const orderDetails = useSelector(state => state.orderDetails)
    const { error, order, loading } = orderDetails

    const orderPay = useSelector(state => state.orderPay)
    const { success:successPay, loading:loadingPay} = orderPay

    useEffect(() => {
        const addPaypalScript = async() => {
            const { data: clientId } = await axios.get('/api/config/paypal')
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.src= `https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.async = true
            script.onload = () => {
                setSdkReady(true)
            }
            document.body.appendChild(script)
        }

        if(!order || successPay){
            dispatch({
                type : ORDER_PAY_RESET
            })
            dispatch(getOrderDetail(orderId))
        } else if(!order.isPaid){
            if(!window.paypal){
                addPaypalScript()
            }else {
                setSdkReady(true)
            }
        }
    }, [dispatch, orderId, successPay, order])

    const successPaymentHandler = (paymentResult) => {
        console.log(paymentResult)
        dispatch(payOrder(orderId, paymentResult))
    }
 
    return loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : <>
        <h1>Order : {order._id}</h1>
        <Row>
            <Col md={8}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>Shipping</h2>
                        <p>
                            <strong>{order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}</strong>
                        </p>
                        {order.isDelivered ? (
                            <Message variant='success'>Delivered</Message>
                        ) : (
                            <Message variant='danger'>Not Delivered</Message>
                        )}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h2>Payment Method</h2>
                        <p>
                            <strong>method : {order.paymentMethod}</strong>
                        </p>
                        {order.isPaid ? (
                            <Message variant='success'>Order Is Paid on {order.paidAt}</Message>
                        ) : (
                            <Message variant='danger'>Order Isnt Paid Yet</Message>
                        )}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h2>Order</h2>
                        {order.orderItems.length === 0 ? (<Message variant='danger'>Your order is empty</Message>) : (
                            <ListGroup variant='flush'>
                                {order.orderItems.map((item,index) => (
                                    <ListGroup.Item key={index}>
                                        <Row>
                                            <Col md={1}>
                                                <Image src={item.image} rounded alt={item.name} fluid />    
                                            </Col>
                                            <Col>
                                                <Link to={`/product/${item.product}`} >
                                                    {item.name} 
                                                </Link>
                                            </Col>
                                            <Col md={4}>
                                                {item.qty} x ${item.price} = ${(item.qty * item.price).toFixed(2)}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        )}
                    </ListGroup.Item>
                </ListGroup>
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Order Summary</h2>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>
                                    Items :
                                </Col>
                                <Col>
                                  ${order.itemsPrice}
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>
                                Shipping :
                                </Col>
                                <Col>
                                   ${order.shippingPrice}
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>
                                    Tax :
                                </Col>
                                <Col>
                                    ${order.taxPrice}
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>
                                    Total :
                                </Col>
                                <Col>
                                    ${order.totalPrice}
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        {!order.isPaid && (
                            <ListGroup.Item>
                                {loadingPay && <Loader />}
                                {!sdkReady ? <Loader /> : (
                                    <PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler}/>
                                )}
                            </ListGroup.Item>
                        )}
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    </>
}

export default OrderDetailScreen
