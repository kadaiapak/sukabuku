import React, { useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { allUsers, deleteUser } from '../actions/userActions'
import { Button, Table } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { LinkContainer } from 'react-router-bootstrap'

function UserListScreen({history}) {
    const dispatch = useDispatch()
    
    const getAllUsers = useSelector(state => state.getAllUsers)
    const { loading, users, error } = getAllUsers

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userDelete = useSelector(state => state.userDelete)
    const { success : successDelete } = userDelete
     
    useEffect(() => {
        if(userInfo && userInfo.isAdmin){
            dispatch(allUsers())
        } else {
            history.push('/login')
        }
    }, [dispatch, history, userInfo, successDelete])

    const deleteHandler = (id) => {
        if(window.confirm('Are you sure?')){
        dispatch(deleteUser(id))
        }
    }

    return (
        <>
        <h1>Users</h1>
        {loading ? (
            <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
<Table striped bordered responsive hover size='table-sm'>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Admin</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody> 
                    {users.map( user=> (
                        <tr key={user._id}>
                            <td>{user._id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.isAdmin ? (
                                <i className="fas fa-check" style={{color : 'green'}}></i>
                            ) : (
                                <i className="fas fa-times" style={{color : 'red'}}></i>
                            )}</td>
                            <td>
                                <LinkContainer to={`/admin/user/${user._id}/edit`}>
                                    <Button variant='light' className='btn-sm'>
                                        <i className='fas fa-edit'></i>
                                    </Button>
                                </LinkContainer>
                                <Button variant='danger' 
                                        className="btn-sm" 
                                        onClick={(e) => deleteHandler(user._id)}>
                                            <i className="fas fa-trash"></i>
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            )}
        </>
    )
}



export default UserListScreen
