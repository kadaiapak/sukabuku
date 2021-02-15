import React, { useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getOrderDetail } from '../actions/orderAction'
import { Row, Col, ListGroup } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'

const AdminOrderDetailScreen = ({match, history}) => {
    const dispatch = useDispatch()
    const orderId = match.params.id

    // get data user login agar jika dia tidak admin maka dia akan terpental keluar
    const userLogin = useSelector(state => state.userLogin )
    const { userInfo } = userLogin

    const orderDetails = useSelector(state => state.orderDetails)
    const { order, loading:loadingDetail, error:errorDetail } = orderDetails

    useEffect(() => {
        if(userInfo && userInfo.isAdmin){
            dispatch(getOrderDetail(orderId))
        }else {
            history.push('/login')
        }
    }, [history, dispatch, userInfo, orderId])
    return (
        <>
            {loadingDetail ? <Loader></Loader> : errorDetail ? <Message variant='danger'>{errorDetail}</Message> : (
            <Row>
                <Col md={6}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h1>Address</h1>
                            <p>{order.shippingAddress.address},{order.shippingAddress.city},{order.shippingAddress.country},{order.shippingAddress.postalCode}</p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h1>Payment</h1>
                            <p>Method : {order.paymentMethod}</p>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={3}>
                </Col>
            </Row>
            )}
            
        </>
    )
}

export default AdminOrderDetailScreen
