import { LIST_MY_ORDERS_FAIL, LIST_MY_ORDERS_REQUEST, LIST_MY_ORDERS_RESET, LIST_MY_ORDERS_SUCCESS, ORDER_DELIVER_FAIL, ORDER_DELIVER_REQUEST, ORDER_DELIVER_RESET, ORDER_DELIVER_SUCCESS, ORDER_DETAIL_FAIL, ORDER_DETAIL_REQUEST, ORDER_DETAIL_SUCCESS, ORDER_GET_ALL_FAIL, ORDER_GET_ALL_REQUEST, ORDER_GET_ALL_SUCCESS, ORDER_PAY_FAIL, ORDER_PAY_REQUEST, ORDER_PAY_RESET, ORDER_PAY_SUCCESS, ORDER_SAVE_FAIL, ORDER_SAVE_REQUEST, ORDER_SAVE_SUCCESS } from "../constants/orderConstants"

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

// reducer for update order to pay by admin
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

// reducer untuk update order to deliver by admin
export const orderDeliverReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_DELIVER_REQUEST:
            return {
                loading : true
            }
        case ORDER_DELIVER_SUCCESS:
            return {
                loading : false,
                success : true
            }
        case ORDER_DELIVER_FAIL:
            return {
                loading : false,
                error : action.payload
            }
        case ORDER_DELIVER_RESET:
            return {}
        default:
            return state
    }
}

// reducer untuk list ordernya sendiri dari para user
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

// reducer untuk list semua order by admin
export const listAllOrderReducer = (state ={ orders : [] }, action) => {
    switch(action.type){
        case ORDER_GET_ALL_REQUEST:
            return {
                ...state,
                loading : true
            }
        case ORDER_GET_ALL_SUCCESS:
            return {
                loading : false,
                success : true,
                orders : action.payload
            }
        case ORDER_GET_ALL_FAIL:
            return {
                loading : false,
                error : action.payload
            }
        default :
            return state
    }
}