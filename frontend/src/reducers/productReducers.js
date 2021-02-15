import { CREATE_PRODUCT_FAIL, CREATE_PRODUCT_REQUEST, CREATE_PRODUCT_RESET, CREATE_PRODUCT_SUCCESS, DELETE_PRODUCT_FAIL, DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_SUCCESS, DETAILS_PRODUCT_FAIL, DETAILS_PRODUCT_REQUEST, DETAILS_PRODUCT_SUCCESS, EDIT_PRODUCT_FAIL, EDIT_PRODUCT_REQUEST, EDIT_PRODUCT_RESET, EDIT_PRODUCT_SUCCESS, GET_PRODUCT_FAIL, GET_PRODUCT_REQUEST, GET_PRODUCT_SUCCESS } from "../constants/productConstants";

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

export const productDetailsReducer = (state = { product: { reviews: [] } }, action) => {
    switch (action.type) {
        case DETAILS_PRODUCT_REQUEST:
            return {
                ...state,
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

export const productDeleteReducer = (state = {}, action) => {
    switch(action.type){
        case DELETE_PRODUCT_REQUEST:
            return {
                loading : true
            }
        case DELETE_PRODUCT_SUCCESS:
            return {
                loading : false,
                success : true
            }
        case DELETE_PRODUCT_FAIL:
            return {
                loading : false,
                error : action.payload
            }
        default : 
            return state
    }
}

//CREAT PRODUCT REDUCER
export const productCreateReducer = (state ={}, action) => {
    switch(action.type){
        case CREATE_PRODUCT_REQUEST:
            return {
                loading : true,
            }
        case CREATE_PRODUCT_SUCCESS:
            return {
                loading : false,
                success : true,
                product : action.payload
            }
        case CREATE_PRODUCT_FAIL:
            return {
                loading : false,
                error : action.payload
            }
        case CREATE_PRODUCT_RESET:
            return {}
        default : 
        return state
    }
}

// reducer untuk update
export const productEditReducer = (state ={}, action) => {
    switch(action.type){
        case EDIT_PRODUCT_REQUEST:
            return {
                loading : true
            }
        case EDIT_PRODUCT_SUCCESS:
            return {
                loading : false,
                success : true,
                product : action.payload
            }
        case EDIT_PRODUCT_FAIL:
            return {
                loading : false,
                error : action.payload
            }
        case EDIT_PRODUCT_RESET:
            return {}
        default :
        return state
        }
}