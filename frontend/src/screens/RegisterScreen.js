import React, { useState, useEffect } from 'react'
import FormContainer from '../components/FormContainer'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button, Row, Col, Form } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {registerUser } from '../actions/userActions'

const RegisterScreen = ({location, history}) => {
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const userRegister = useSelector(state => state.userRegister)
    const { userInfo, error, loading } = userRegister

    const userLogin = useSelector(state => state.userLogin)

    const redirect = location.search ? location.search.split('=')[1] : '/'
    const dispatch = useDispatch()

    useEffect(() => {
        if(userInfo || userLogin.userInfo){
            history.push(redirect)
        }
    }, [history, userInfo, redirect, userLogin])

    

    const registerSubmit = (e) => {
        e.preventDefault()
        if(password !== confirmPassword){
            setMessage('Password do not match')
        } else {
            dispatch(registerUser(name,email,password))
        }
    }
    return (
        <FormContainer>
            <h1>Sign Up</h1>
            {message && <Message variant="danger">{message}</Message>}
            {error && <Message variant="danger">{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={registerSubmit}>
                 <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="enter a name" />
                 </Form.Group>
                 <Form.Group controlId="email">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type="email" placeholder="enter a password" value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
                 </Form.Group>
                 <Form.Group controlId="password">
                     <Form.Label>Password</Form.Label>
                     <Form.Control type="password" placeholder="enter a password" value={password} onChange={(e)=> setPassword(e.target.value)} />
                 </Form.Group>
                 <Form.Group controlId="confirmPassword">
                     <Form.Label>Confirm Password</Form.Label>
                     <Form.Control type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}></Form.Control>
                 </Form.Group>
                 <Button type="submit" variant="primary">Register</Button>
            </Form>

            <Row className="py-3">
                <Col> 
                    Already have an account ?? <Link to={redirect ? `/login?redirect=${redirect}` : '/login'} >Login</Link>
                </Col>
            </Row>
        </FormContainer>
            )
}

export default RegisterScreen
