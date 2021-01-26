import React, {useState, useEffect} from 'react'
import { Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails } from '../actions/userActions'
import FormContainer from '../components/FormContainer'
import Loader from '../components/Loader'
import Message from '../components/Message'

const UserEditScreen = ({match, history}) => {
    const userId = match.params.id
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [isAdmin,setIsAdmin] = useState(false)

    const userDetails = useSelector(state => state.userDetails)
    const { user, loading, error } = userDetails

    const dispatch = useDispatch()

    useEffect(() => {
    if(!user.name || user._id !== userId){
        dispatch(getUserDetails(userId))
    }else {
        setName(user.name)
        setEmail(user.email)
        setIsAdmin(user.isAdmin)
    }
    }, [user, userId, dispatch])

    const submitHandler = (e) => {
        e.preventDefault()
        console.log('submitted')
    }

    return (
        <>
         <FormContainer>
             <Link to='/admin/users' className='btn btn-light my-3'>Go Back</Link>
            <h3> User Detail </h3>
            {loading ? <Loader/> : error ? <Message variant="danger">{error}</Message> : (
            <Form onSubmit={submitHandler}>
                <Form.Group controlId="Name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control 
                        type='name'
                        placeholder='Enter Name'
                        value={name}
                        onChange={(e) => setName(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                         type='email'
                         placeholder='Enter Email'
                         value={email}
                         onChange={(e) => setEmail(e.target.value)}
                         />
                </Form.Group>
                <Form.Group controlId="isAdmin">
                    <Form.Label>Is Admin</Form.Label>
                    <Form.Check
                         type='checkbox'
                         labe='Is Admin'
                         checked={isAdmin}
                         onChange={(e) => setIsAdmin(e.target.checked)}
                         />
                </Form.Group>
                <Button type='submit'>
                    Submit
                </Button>
            </Form>
            )}
        </FormContainer>  
        </>
    )
}

export default UserEditScreen
