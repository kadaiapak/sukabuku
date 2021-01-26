import React, { useState, useEffect } from 'react'
import { Col, Form, Row, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import Message from '../components/Message'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'


const ProfileScreen = ({history}) => {
    const [name,setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()
    
        const userDetails = useSelector(state => state.userDetails)
        const { user, error } = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { success } = userUpdateProfile


    useEffect(()=> {
        if(!userInfo){
            history.push('/login')
        } else {
            if(!user || !user.name || success){
                dispatch({ type : USER_UPDATE_PROFILE_RESET })
                dispatch(getUserDetails('profile'))
            }else{
                setName(user.name)
                setEmail(user.email)    
            }
        }
    },[dispatch, history, userInfo, user, success])

    
    const profileSubmit = (e) => {
        e.preventDefault()
        if(password !== confirmPassword){
            setMessage('Password not match')
        }else {
            dispatch(updateUserProfile({ id : user._id, name, email, password}))
        }
    }
    
    
    return (
        <Row>
            <Col md={3}> 
            <h2>User Profile</h2>
            {error && <Message variant="danger">{error}</Message>}
            {message && <Message>{message} </Message>}
            {success && <Message>Success</Message>}
                <Form onSubmit={profileSubmit}>
                    <Form.Group controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="name" 
                                      value={name} 
                                      onChange={(e) => setName(e.target.value)}>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control 
                        type="email"
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                        type="password" 
                        placeholder="Password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="updatePassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control  
                            type="password" 
                            placeholder="Confirm Password" 
                            value={confirmPassword} 
                            onChange={(e) => setConfirmPassword(e.target.value)}>
                        </Form.Control>
                    </Form.Group>
                    <Button type="submit" variant="primary">Update</Button>
                </Form>
            </Col> 
            <Col md={9}>
                <h2>User Order</h2>
            </Col>
            
        </Row>
    )
}


export default ProfileScreen
