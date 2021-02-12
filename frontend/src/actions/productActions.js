import { CREATE_PRODUCT_FAIL, CREATE_PRODUCT_REQUEST, CREATE_PRODUCT_SUCCESS, DELETE_PRODUCT_FAIL, DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_SUCCESS, DETAILS_PRODUCT_FAIL, DETAILS_PRODUCT_REQUEST, DETAILS_PRODUCT_SUCCESS, GET_PRODUCT_FAIL, GET_PRODUCT_REQUEST, GET_PRODUCT_SUCCESS } from "../constants/productConstants"
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