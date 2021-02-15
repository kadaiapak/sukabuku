import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllOrderAction } from '../actions/orderAction'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'





const OrderListScreen = ({history}) => {
    const dispatch = useDispatch()
    // ambil data dari list order reducer
    const listAllOrder = useSelector((state) => state.listAllOrder)
  const { loading, error, orders } = listAllOrder
    // ambil data dari user yang login dari userlogin reducer
    const userLogin  = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    
    //gunakan useEffect
    useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(getAllOrderAction())
    } else {
      history.push('/login')
    }
  }, [dispatch, history, userInfo])

    return (
      // kalau tidak ada loading, order.map akan terjadi error karena komponen di load terlalu cepat
      <>
        {loading ? (<Loader></Loader>) : (
            <Table striped bordered hover responsive className='table-sm'>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>User</th>
                    <th>Price</th>
                    <th>Is Paid</th>
                    <th>Is Delivered</th>
                    <th>Details</th>
                </tr>
            </thead>
            <tbody>
                {orders.map(order => (
                    <tr key={order._id}>
                        <td>{order._id}</td>
                        <td>{order.user && order.user.name}</td>
                        <td>{order.totalPrice}</td>
                        <td>{order.isPaid ? order.paidAt.substring(0, 10) : (
                          <i className='fas fa-times' style={{color : 'red'}} />
                        )}</td>
                        <td>{order.isDelivered ? order.deliveredAt.substring(0, 10) : (
                          <i className='fas fa-times' style={{color : 'red'}} />
                        )}</td>
                        <td>
                          <LinkContainer to={`/admin/orderdetail/${order._id}`}>
                            <Button variant='light' className='btn-sm'>Details</Button>
                          </LinkContainer>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
        )}
        
        </>
    )
}

export default OrderListScreen
