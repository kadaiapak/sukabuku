import axios from 'axios'
import { CART_ADD_ITEMS, CART_REMOVE_ITEMS, CART_SAVE_PAYMENT_METHOD, CART_SAVE_SHIPPING_ADDRESS } from '../constants/cartConstants'

export const addToChart = (id,qty) => async (dispatch,getState) => {
    const { data } = await axios.get(`/api/products/${id}`)
    dispatch({
        type : CART_ADD_ITEMS,
        payload : {
            product : data._id,
            name : data.name,
            image : data.image,
            price : data.price,
            countInStock : data.countInStock,
            qty
        }
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
 }

 export const removeFromChart = (id) => (dispatch, getState) => {
    dispatch({
        type : CART_REMOVE_ITEMS,
        payload : id
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
 }

 export const processShippingAdress = (data) => (dispatch) => {
     dispatch({
         type : CART_SAVE_SHIPPING_ADDRESS,
         payload : data
     })

     localStorage.setItem('shippingAddress', JSON.stringify(data))
 }

 export const processPaymentMethod = (data) => (dispatch) => {
    dispatch({
        type: CART_SAVE_PAYMENT_METHOD,
        payload : data
    })
    localStorage.setItem('paymentMethod', JSON.stringify(data))
 }