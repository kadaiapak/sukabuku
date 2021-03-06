import { CREATE_PRODUCT_FAIL, CREATE_PRODUCT_REQUEST, CREATE_PRODUCT_SUCCESS, DELETE_PRODUCT_FAIL, DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_SUCCESS, DETAILS_PRODUCT_FAIL, DETAILS_PRODUCT_REQUEST, DETAILS_PRODUCT_SUCCESS, EDIT_PRODUCT_FAIL, EDIT_PRODUCT_REQUEST, EDIT_PRODUCT_SUCCESS, GET_PRODUCT_FAIL, GET_PRODUCT_REQUEST, GET_PRODUCT_SUCCESS, PRODUCT_TOP_FAIL, PRODUCT_TOP_REQUEST, PRODUCT_TOP_SUCCESS, REVIEW_PRODUCT_FAIL, REVIEW_PRODUCT_REQUEST, REVIEW_PRODUCT_SUCCESS } from "../constants/productConstants"
import axios from 'axios'

export const listProducts = (keyword='') => async (dispatch) => {
    try {
        dispatch({
            type: GET_PRODUCT_REQUEST,
        })
    
        const { data } = await axios.get(`/api/products?keyword=${keyword}`)
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

export const deleteProductAction = (id) => async(dispatch, getState) => {
    try{
        dispatch({
            type : DELETE_PRODUCT_REQUEST
        })

        const { userLogin : { userInfo }} = getState()

        const config = {
            headers : {
                Authorization : `Bearer ${userInfo.token}`
            }
        }

        await axios.delete(`/api/products/${id}`, config)
        dispatch({
            type : DELETE_PRODUCT_SUCCESS
        })
    }catch(error){
        dispatch({
            type : DELETE_PRODUCT_FAIL,
            payload : error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

// crate product action
export const createProductAction = () => async(dispatch, getState) => {
    try{
        dispatch({
            type : CREATE_PRODUCT_REQUEST
        })

        const { userLogin : { userInfo }} = getState()

        const config = {
            headers : {
                Authorization : `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post(`/api/products`, {}, config)
        
        dispatch({
            type : CREATE_PRODUCT_SUCCESS,
            payload : data
        })
    }catch(error){
        dispatch({
            type : CREATE_PRODUCT_FAIL,
            payload : error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

// edit product action
export const editProductAction = (product) => async(dispatch,getState) => {
    try {
        // pertama kali dispatch untuk request
        dispatch({
            type : EDIT_PRODUCT_REQUEST
        })

        // ambil data dari state, data yang kita butuhkan yaitu token, agar bisa di cek apakah dia login, dan apakah yang login itu admin
        const {userLogin : {userInfo}} = getState()

        // memasukkan config
        const config = {
            headers : {
                'Content-Type' : 'application/json',
                Authorization : `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(`/api/products/${product._id}`, product, config )
        dispatch({
            type : EDIT_PRODUCT_SUCCESS,
            payload : data
        })

    } catch (error) {
        dispatch({
            type : EDIT_PRODUCT_FAIL,
            payload : error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

// action untuk review / comment product
export const reviewProductAction = (productId, review) => async(dispatch,getState) => {
    try {
        dispatch({
            type : REVIEW_PRODUCT_REQUEST
        })

        const {userLogin : {userInfo}} = getState()

        const config = {
            headers : {
                'Content-Type' : 'application/json',
                Authorization : `Bearer ${userInfo.token}`
            }
        }

        await axios.post(`/api/products/${productId}/reviews`, review, config)

        dispatch({
            type : REVIEW_PRODUCT_SUCCESS
        })

    } catch (error) {
        dispatch({
            type : REVIEW_PRODUCT_FAIL,
            payload : error.response && error.response.data.message ? error.response.data.message : error.message

        })
    }
}

// action untuk top product untuk carousel

export const productTopAction = () => async(dispatch) => {
    try {
        dispatch({
            type : PRODUCT_TOP_REQUEST
        })

        const { data } = await axios.get('/api/products/top')

        dispatch({
            type : PRODUCT_TOP_SUCCESS,
            payload : data
        })
    } catch (error) {
        dispatch({
            type : PRODUCT_TOP_FAIL,
            payload : error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}