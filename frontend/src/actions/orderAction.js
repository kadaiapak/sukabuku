import axios from 'axios'
import { LIST_MY_ORDERS_FAIL, LIST_MY_ORDERS_REQUEST, LIST_MY_ORDERS_SUCCESS, ORDER_DETAIL_FAIL, ORDER_DETAIL_REQUEST, ORDER_DETAIL_SUCCESS, ORDER_PAY_FAIL, ORDER_PAY_REQUEST, ORDER_PAY_SUCCESS, ORDER_SAVE_FAIL, ORDER_SAVE_REQUEST, ORDER_SAVE_SUCCESS } from '../constants/orderConstants'


export const saveOrder = ( order ) => async(dispatch, getState) => {
    try {
        dispatch({
            type : ORDER_SAVE_REQUEST
        })

        const { userLogin : { userInfo }} = getState()

        const config = {
            headers : {
                'Content-Type' : 'application/json',
                Authorization : `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post('/api/orders', order, config )
        dispatch({
            type : ORDER_SAVE_SUCCESS,
            payload : data,
        })
        
    } catch (error) {
        dispatch({
            type : ORDER_SAVE_FAIL,
            payload : error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }

}

export const getOrderDetail = (id) => async(dispatch, getState) => {
    try {
        dispatch({
            type : ORDER_DETAIL_REQUEST
        })

        const {userLogin : { userInfo }} = getState()
        const config = {
            headers : {
                Authorization : `Bearer ${userInfo.token}`,
            }
        }

        const { data } = await axios.get(`/api/orders/${id}`, config )
        dispatch({
            type : ORDER_DETAIL_SUCCESS,
            payload : data
        })
    } catch (error) {
        dispatch({
            type : ORDER_DETAIL_FAIL,
            payload : error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const payOrder = (orderId, paymentResult) => async(dispatch, getState) => {
    try {
        dispatch({
            type : ORDER_PAY_REQUEST
        })
        
        const {userLogin : { userInfo }} = getState()

        const config = {
            headers : {
                'Content-Type' : 'application/json',
                Authorization : `Bearer ${userInfo.token}`
            }
        }

        await axios.put(`/api/orders/${orderId}/pay`, paymentResult, config)
        dispatch({
            type : ORDER_PAY_SUCCESS
        })
    } catch (error) {
        dispatch({
            type : ORDER_PAY_FAIL,
            payload : error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const listMyOrdersAction = () => async(dispatch, getState) => {
    try {
        dispatch({
            type : LIST_MY_ORDERS_REQUEST
        })

        const {userLogin : { userInfo }} = getState()
        
        const config = {
            headers : {
                Authorization : `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get('/api/orders/myorders', config)
        dispatch({
            type : LIST_MY_ORDERS_SUCCESS,
            payload : data
        })
    } catch (error) {
        dispatch({
            type: LIST_MY_ORDERS_FAIL,
            payload : error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}