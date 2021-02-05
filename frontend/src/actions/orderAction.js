import axios from 'axios'
import { ORDER_DETAIL_FAIL, ORDER_DETAIL_REQUEST, ORDER_DETAIL_SUCCESS, ORDER_SAVE_FAIL, ORDER_SAVE_REQUEST, ORDER_SAVE_SUCCESS } from '../constants/orderConstants'


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