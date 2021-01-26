import { DETAILS_PRODUCT_FAIL, DETAILS_PRODUCT_REQUEST, DETAILS_PRODUCT_SUCCESS, GET_PRODUCT_FAIL, GET_PRODUCT_REQUEST, GET_PRODUCT_SUCCESS } from "../constants/productConstants"
import axios from 'axios'

export const listProducts = () => async (dispatch) => {
    try {
        dispatch({
            type: GET_PRODUCT_REQUEST,
        })
    
        const { data } = await axios.get('/api/products')
        dispatch({
            type: GET_PRODUCT_SUCCESS,
            payload : data
        })

    } catch (error) {
        dispatch({
            type: GET_PRODUCT_FAIL,
            payload : error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }   
}

export const listProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({
            type : DETAILS_PRODUCT_REQUEST
        })

        const {data } = await axios.get(`/api/products/${id}`)
        dispatch({
            type : DETAILS_PRODUCT_SUCCESS,
            payload : data
        })
    } catch (error) {
        dispatch({
            type: DETAILS_PRODUCT_FAIL,
            payload : error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}