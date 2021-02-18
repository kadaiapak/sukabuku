import React, { useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { deliverOrder, getOrderDetail } from '../actions/orderAction'
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { ORDER_DELIVER_RESET } from '../constants/orderConstants'

const AdminOrderDetailScreen = ({match, history}) => {
    const dispatch = useDispatch()
    const orderId = match.params.id

    // get data user login agar jika dia tidak admin maka dia akan terpental keluar
    const userLogin = useSelector(state => state.userLogin )
    const { userInfo } = userLogin

    const orderDetails = useSelector(state => state.orderDetails)
    const { order, loading:loadingDetail, error:errorDetail } = orderDetails

    // mendapatkan hasil dari order to deliver action melalui reducer
    const orderDeliver = useSelector(state => state.orderDeliver)
    const {error : errorDeliver, loading:loadingDeliver, success:successDeliver } = orderDeliver

    useEffect(() => {
        if(successDeliver){
            dispatch({
                type : ORDER_DELIVER_RESET
            })
            history.push('/admin/orderlist')
        }
        if(userInfo && userInfo.isAdmin ){
            dispatch(getOrderDetail(orderId))
        }else {
            history.push('/login')
        }
    }, [history, dispatch, userInfo, orderId, successDeliver])

    const deliverHandler = () =>{
        dispatch(deliverOrder(order._id))
    }
    return (
        <>
            {loadingDeliver && <Loader />}
            {errorDeliver && <Message variant='danger'>{errorDeliver}</Message>}
            {loadingDetail ? <Loader></Loader> : errorDetail ? <Message variant='danger'>{errorDetail}</Message> : (
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h1>User : {order.user.name}</h1>
                            <p>Email : {order.user.email}</p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h1>Address</h1>
                            <p>{order.shippingAddress.address},{order.shippingAddress.city},{order.shippingAddress.country},{order.shippingAddress.postalCode}</p>
                        </ListGroup.Item>
                        {order.isDelivered ? (
                            <Message>Delivered At {order.deliveredAt.substring(0,10)}</Message>
                        ) : (
                            <Message variant='danger'>Not Delivered Yet</Message>
                        )}
                        <ListGroup.Item>
                            <h1>Payment</h1>
                            <p>Method : {order.paymentMethod}</p>
                        </ListGroup.Item>
                        {order.isPaid ? (
                            <Message>Paid at {order.paidAt.substring(0,10)}</Message>
                        ) : (
                            <Message variant='danger'>Not Paid Yet</Message>
                        )}
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
                                        {order.itemsPrice}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Shipping :
                                    </Col>
                                    <Col>
                                        {order.shippingPrice}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Tax :
                                    </Col>
                                    <Col>
                                        {order.taxPrice}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Total :
                                    </Col>
                                    <Col>
                                        {order.totalPrice}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            {userInfo && userInfo.isAdmin && order && order.isPaid && !order.isDelivered && (
                                <ListGroup.Item>
                                    <Button 
                                        type='button' 
                                        className='btn-block' 
                                        disabled={!userInfo || !userInfo.isAdmin || !order || !order.isPaid || order.isDelivered}
                                        onClick={deliverHandler}>
                                        
                                        Deliver item
                                    </Button>
                                </ListGroup.Item>
                            )}
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
            )}
            
        </>
    )
}

export default AdminOrderDetailScreen
