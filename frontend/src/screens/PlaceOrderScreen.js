import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Col, Row, ListGroup, Image, Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import CheckoutStep from '../screens/CheckoutStep'
import Message from '../components/Message'
import { saveOrder } from '../actions/orderAction'

const PlaceOrderScreen = ({history}) => {
    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const { shippingAddress, paymentMethod, cartItems } = cart

    const orderSave = useSelector(state => state.orderSave)
    const { error, success, order } = orderSave

    const tambahDuaAngkaBelakangKoma = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2)
    }

    cart.itemsPrice = tambahDuaAngkaBelakangKoma(cartItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2))
    cart.shippingPrice = tambahDuaAngkaBelakangKoma(cart.itemsPrice > 100 ? 0 : 100)
    // cart.shippingPrice = tambahDuaAngkaBelakangKoma(100) hanya mencoba
    cart.taxPrice = tambahDuaAngkaBelakangKoma(Number((0.15*cart.itemsPrice).toFixed(2)))
    cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2)
    
    useEffect(() => {
        if(success){
            history.push(`/order/${order._id}`)
        }
        // eslint-disable-next-line
    }, [success])
    
    const placeOrderHandler = () => {
        dispatch(saveOrder({
            orderItems : cartItems,
            shippingAddress : shippingAddress,
            paymentMethod,
            taxPrice : cart.taxPrice,
            shippingPrice : cart.shippingPrice,
            itemsPrice : cart.itemsPrice,
            totalPrice : cart.totalPrice 
        }))
    }
    return (
        <>
        <CheckoutStep step1 step2 step3 step4 />
        <Row>
            <Col md={8}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>Shipping</h2>
                        <p>
                            <strong>{shippingAddress.address}, {shippingAddress.city}, {shippingAddress.postalCode}, {shippingAddress.country}</strong>
                        </p>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h2>Payment Method</h2>
                        <p>
                            <strong>method : {paymentMethod}</strong>
                        </p>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h2>Order</h2>
                        {cartItems.length === 0 ? <Message variant='danger'>Your order is empty</Message> : (
                            <ListGroup variant='flush'>
                                {cartItems.map((item,index) => (
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
                                  ${cart.itemsPrice}
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>
                                Shipping :
                                </Col>
                                <Col>
                                   ${cart.shippingPrice}
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>
                                    Tax :
                                </Col>
                                <Col>
                                    ${cart.taxPrice}
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>
                                    Total :
                                </Col>
                                <Col>
                                    ${cart.totalPrice}
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            {error && <Message variant='danger'>{error}</Message>}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button type='button' className='btn-block' disabled={cartItems === 0} onClick={placeOrderHandler}>
                                    Place Order
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
        </>
    )
}

export default PlaceOrderScreen
