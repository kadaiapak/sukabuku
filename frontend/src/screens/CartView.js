import React, { useEffect} from 'react'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import { useDispatch, useSelector} from 'react-redux'
import { Link } from 'react-router-dom'
import { addToChart, removeFromChart } from '../actions/cartActions'
import Message from '../components/Message'

const CartView = ({match, history, location}) => {
    const productId = match.params.id
    const qty = location.search ? Number(location.search.split('=')[1]) : 1
    const dispatch = useDispatch()
    console.log(productId,qty)
    const cart = useSelector(state => state.cart)
    const {cartItems} = cart
    useEffect(()=> {
        if(productId){
            dispatch(addToChart(productId, qty))
        }
    }, [dispatch,productId,qty])

    const proceedToCheckout = () => {
        history.push('/login?redirect=shipping')
    }
    return (
        <Row>
            <Col md={8}>
            {cartItems.length === 0 ? (
                 <Message>Your Cart is Empty</Message> ): (
                <ListGroup variant='flush'>
                    {cartItems.map(item => (
                        <ListGroup.Item key={item.product}>
                            <Row>
                                <Col md={2}>
                                    <Image src={item.image} alt={item.name} fluid rounded/>
                                </Col>
                                <Col md={3}>
                                    <Link to ={`/product/${item.product}`} >{item.name}</Link>
                                </Col>
                                <Col md={2}>
                                    {item.price}
                                </Col>
                                <Col md={2}>
                                    <Form.Control as="select" value={item.qty} onChange={(e)=> dispatch(addToChart(item.product,Number(e.target.value)))}>
                                        {[...Array(item.countInStock).keys()].map( x => (
                                            <option key={x+1} value={x+1}>{x+1}</option>
                                        ))}
                                    </Form.Control>
                                </Col>
                                <Col md={2}>
                                    <Button type="button" variant="light" onClick={(e)=> dispatch(removeFromChart(item.product))}>
                                        <i className="fas fa-trash"></i>
                                    </Button>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            )}
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>Subtotal ({cartItems.reduce((acc,item)=> acc + item.qty, 0)}) Items</h2>
                            Price : $ {cartItems.reduce((acc,item)=> acc + item.qty * item.price, 0).toFixed(2)}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button className="btn btn-block" disabled={cartItems.length === 0} onClick={proceedToCheckout}>
                                Proceed to Checkout
                            </Button>
                        </ListGroup.Item>
                        <ListGroup.Item>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>                       
            </Col>
        </Row>
    )
}

export default CartView
