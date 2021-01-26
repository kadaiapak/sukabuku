import React, { useState } from 'react'
import { Form, Col, Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutStep from './CheckoutStep'
import { processPaymentMethod } from '../actions/cartActions'

const PaymentScreen = ({ history }) => {
    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    const [ paymentMethod, setPaymentMethod ] = useState('PayPal')

    if(!shippingAddress){
        history.push('/shipping')
    }
    const paymentSubmit = (e) => {
        e.preventDefault()
        dispatch(processPaymentMethod(paymentMethod))
        history.push('/placeorder')
    }
    return (
        <FormContainer>
            <CheckoutStep step1 step2 step3 />
            <h1>Payment Method</h1>
            <Form onSubmit={paymentSubmit}>
                <Form.Group>
                    <Form.Label as='legend'>Select Method</Form.Label>
                    <Col>
                        <Form.Check
                            type='radio'
                            label='PayPal or Credit'
                            value='PayPal'
                            id='PayPal'
                            name='paymentMethod'
                            checked
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        ></Form.Check>
                    {/* <Form.Check
                        type='radio'
                        label='GoPay'
                        value='GoPay'
                        id='GoPay'
                        name='paymentMethod'
                        checked
                        onChange={(e) => setPaymentMethod(e.target.value)}
                    ></Form.Check> */}
                    </Col>
                </Form.Group>
                <Button variant='primary' type='submit'>Process</Button>
            </Form>
        </FormContainer>
    )
}

export default PaymentScreen
