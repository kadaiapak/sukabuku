import { LIST_MY_ORDERS_FAIL, LIST_MY_ORDERS_REQUEST, LIST_MY_ORDERS_RESET, LIST_MY_ORDERS_SUCCESS, ORDER_DETAIL_FAIL, ORDER_DETAIL_REQUEST, ORDER_DETAIL_SUCCESS, ORDER_PAY_FAIL, ORDER_PAY_REQUEST, ORDER_PAY_RESET, ORDER_PAY_SUCCESS, ORDER_SAVE_FAIL, ORDER_SAVE_REQUEST, ORDER_SAVE_SUCCESS } from "../constants/orderConstants"

export const orderSaveReducer = ( state = {}, action ) => {
    switch (action.type) {
        case ORDER_SAVE_REQUEST:
            return {
                loading : true
            }
        case ORDER_SAVE_SUCCESS:
            return {
                loading : false,
                success : true,
                order : action.payload
            }
        case ORDER_SAVE_FAIL:
            return {
                loading : false,
                error : action.payload
            }
        default:
            return state
    }
}

export const orderDetailsReducer = ( state = { loading : true, orderItems: [], shippingAddress: {}}, action) => {
    switch (action.type) {
        case ORDER_DETAIL_REQUEST:
            return {
                ...state,
                loading : true,
            }
        case ORDER_DETAIL_SUCCESS:
            return {
                loading : false,
                order : action.payload
            }
        case ORDER_DETAIL_FAIL:
            return {
                loading : false,
                error : action.payload
            }
        default:
            return state
    }

}

export const orderPayReducer = (state={}, action) => {
    switch (action.type) {
        case ORDER_PAY_REQUEST:
            return {
                loading : true
            }
        case ORDER_PAY_SUCCESS:
            return {
                loading : false,
                success : true
            }
        case ORDER_PAY_FAIL:
            return {
                loading :false,
                error : action.payload
            }
        case ORDER_PAY_RESET:
            return {}
        default:
            return state
    }
}

export const listMyOrdersReducer = (state = { orders : [] }, action) => {
    switch (action.type) {
        case LIST_MY_ORDERS_REQUEST:
            return {
                loading : true
            }
        case LIST_MY_ORDERS_SUCCESS:
            return {
                loading : false,
                orders : action.payload
            }
        case LIST_MY_ORDERS_FAIL:
            return {
                loading : false,
                error : action.payload
            }
        case LIST_MY_ORDERS_RESET:
            return { orders : []}
        default:
            return state
    }
}