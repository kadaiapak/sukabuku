import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { cartReducers } from "./reducers/cartReducers";
import { listMyOrdersReducer, orderDetailsReducer, orderPayReducer, orderSaveReducer, listAllOrderReducer, orderDeliverReducer } from "./reducers/orderReducers";
import { productCreateReducer, productDeleteReducer, productDetailsReducer, productEditReducer, productListReducer } from './reducers/productReducers'
import { userLoginReducer, userRegisterReducer, userDetailsReducer, userUpdateProfileReducer, getAllUsersReducer, userDeleteReducer, userUpdateReducer } from "./reducers/userReducers";

const reducer = combineReducers({

    // product reducer
    productList : productListReducer,
    productDetails : productDetailsReducer,
    productDelete : productDeleteReducer,
    productCreate : productCreateReducer,
    productEdit : productEditReducer,
    // order reducer
    cart:cartReducers,
    orderSave: orderSaveReducer,
    orderDetails : orderDetailsReducer,
    orderPay : orderPayReducer,
    orderDeliver : orderDeliverReducer,
    listMyOrders : listMyOrdersReducer,
    listAllOrder : listAllOrderReducer,
    
    // user reducer
    userLogin : userLoginReducer,
    userRegister : userRegisterReducer,
    userDetails : userDetailsReducer,
    userDelete : userDeleteReducer,
    userUpdateProfile : userUpdateProfileReducer,
    userUpdate: userUpdateReducer,
    getAllUsers : getAllUsersReducer,
})

const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {}
const paymentMethodFromStorage = localStorage.getItem('paymentMethod') ? JSON.parse(localStorage.getItem('paymentMethod')) : {}
const initialState = {
    cart : { cartItems : cartItemsFromStorage, shippingAddress: shippingAddressFromStorage, paymentMethod:paymentMethodFromStorage},
    userLogin : { userInfo : userInfoFromStorage},
}
const middleware = [thunk]

const store = createStore(reducer,initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store;