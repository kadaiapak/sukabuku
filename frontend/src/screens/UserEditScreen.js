import React, {useState, useEffect} from 'react'
import { Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails, updateUser } from '../actions/userActions'
import FormContainer from '../components/FormContainer'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { USER_UPDATE_RESET } from '../constants/userConstants'

const UserEditScreen = ({match, history}) => {
    const userId = match.params.id
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [isAdmin,setIsAdmin] = useState(false)

    const userDetails = useSelector(state => state.userDetails)
    const { user, loading, error } = userDetails

    const userUpdate = useSelector(state => state.userUpdate)
    const {loading:loadingUpdate, error:errorUpdate, success:successUpdate} = userUpdate

    const dispatch = useDispatch()

    useEffect(() => {
        if(successUpdate){
            dispatch({
                type : USER_UPDATE_RESET
            })
            history.push('/admin/userlist')
        } else {
            if(!user.name || user._id !== userId){
                dispatch(getUserDetails(userId))
            }else {
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
            }
        }   
    }, [user, userId, dispatch, successUpdate, history])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateUser({_id:userId, name, email, isAdmin}))
    }

    return (
        <>
         <FormContainer>
             <Link to='/admin/users' className='btn btn-light my-3'>Go Back</Link>
            <h3> User Detail </h3>
            {loadingUpdate && <Loader />}
            {errorUpdate && <Message>{errorUpdate}</Message>}
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
