import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { cartReducers } from "./reducers/cartReducers";
import { orderSaveReducer } from "./reducers/orderReducers";
import { productDetailsReducer, productListReducer } from './reducers/productReducers'
import { userLoginReducer, userRegisterReducer, userDetailsReducer, userUpdateProfileReducer, getAllUsersReducer, userDeleteReducer } from "./reducers/userReducers";

const reducer = combineReducers({
    productList : productListReducer,
    productDetails:productDetailsReducer,
    cart:cartReducers,
    orderSave: orderSaveReducer,
    userLogin:userLoginReducer,
    userRegister : userRegisterReducer,
    userDetails : userDetailsReducer,
    userDelete : userDeleteReducer,
    userUpdateProfile : userUpdateProfileReducer,
    getAllUsers : getAllUsersReducer
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