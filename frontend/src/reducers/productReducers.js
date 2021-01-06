import { DETAILS_PRODUCT_FAIL, DETAILS_PRODUCT_REQUEST, DETAILS_PRODUCT_SUCCESS, GET_PRODUCT_FAIL, GET_PRODUCT_REQUEST, GET_PRODUCT_SUCCESS } from "../constants/productConstants";

export const productListReducer = (state = { products: [] }, action) => {
    switch(action.type){
        case GET_PRODUCT_REQUEST:
            return {
                loading : true
            }
        case GET_PRODUCT_SUCCESS:
            return {
                loading : false,
                products: action.payload
            }
        case GET_PRODUCT_FAIL:
            return {
                loading :false,
                error : action.payload
            }
        default:
            return state
    }
}

export const productDetailsReducer = (state = { product: { reviews:[]} }, action) => {
    switch (action.type) {
        case DETAILS_PRODUCT_REQUEST:
            return {
                loading : true
            }
        case DETAILS_PRODUCT_SUCCESS:
            return {
                loading : false,
                product : action.payload
            }
        case DETAILS_PRODUCT_FAIL:
            return {
                loading : false,
                error : action.payload
            }
        default:
            return state
    }
}