import { ORDER_SAVE_FAIL, ORDER_SAVE_REQUEST, ORDER_SAVE_SUCCESS } from "../constants/orderConstants"

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