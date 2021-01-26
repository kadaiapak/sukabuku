import { 
    USER_DETAILS_FAIL, 
    USER_DETAILS_REQUEST, 
    USER_DETAILS_SUCCESS, 
    USER_LOGIN_FAIL, 
    USER_LOGIN_REQUEST, 
    USER_LOGIN_SUCCESS, 
    USER_LOGOUT_SUCCESS, 
    USER_REGISTER_FAIL, 
    USER_REGISTER_REQUEST, 
    USER_REGISTER_SUCCESS, 
    USER_DETAILS_LOGOUT, 
    USER_UPDATE_PROFILE_REQUEST, 
    USER_UPDATE_PROFILE_SUCCESS, 
    USER_UPDATE_PROFILE_FAIL,
    USER_UPDATE_PROFILE_RESET, 
    USER_DETAILS_RESET, 
    GET_ALL_USERS_REQUEST,
    GET_ALL_USERS_SUCCESS,
    GET_ALL_USERS_FAIL,
    GET_ALL_USERS_RESET,
    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_DELETE_FAIL
} from "../constants/userConstants";

export const userLoginReducer = (state ={}, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return {
                loading : true
            }
        case USER_LOGIN_SUCCESS:
            return {
                loading : false,
                userInfo : action.payload
            }
        case USER_LOGIN_FAIL: {
            return{
                loading : false,
                error : action.payload
            }
        }
        case USER_LOGOUT_SUCCESS:
            return {}
        default:
            return state
    }
}

export const userRegisterReducer = (state = {}, action) => {
    switch(action.type){
        case USER_REGISTER_REQUEST:
            return {
                loading : true
            }
        case USER_REGISTER_SUCCESS:
            return {
                loading : false,
                userInfo : action.payload
            }
        case USER_REGISTER_FAIL:
            return {
                loading : false,
                error : action.payload
            }
        default :
            return state
    }
}

export const userDetailsReducer = (state = { user : {} }, action) => {
    switch (action.type) {
        case USER_DETAILS_REQUEST:
            return {
                ...state,
                loading : true
            }
        case USER_DETAILS_SUCCESS:
            return {
                user : action.payload,
                loading : false
            }
        case USER_DETAILS_FAIL:
            return {
                loading : false,
                error : action.payload
            }
        case USER_DETAILS_RESET:
            return {
                user : {}
            }
        case USER_DETAILS_LOGOUT:
            return {}
        default:
            return state
    }
}

export const userUpdateProfileReducer = (state ={}, action) => {
    switch (action.type) {
        case USER_UPDATE_PROFILE_REQUEST:
            return {
                loading : true
            }
        case USER_UPDATE_PROFILE_SUCCESS:
            return {
                loading : false,
                userInfo : action.payload,
                success : true
            }
        case USER_UPDATE_PROFILE_FAIL:
            return {
                loading : false,
                error : action.payload
            }
        case USER_UPDATE_PROFILE_RESET:
            return {}
        default:
            return state
    }
}

export const getAllUsersReducer = (state = {users : []}, action) => {
    switch (action.type) {
        case GET_ALL_USERS_REQUEST:
            return {
                loading : true
            }
        case GET_ALL_USERS_SUCCESS:
            return {
                loading : false,
                users : action.payload
            } 
        case GET_ALL_USERS_FAIL:
            return {
                loading : false,
                error : action.payload
            }
        case GET_ALL_USERS_RESET: 
            return {
                users : []
            }
        default:
            return state
    }
}

export const userDeleteReducer = (state ={}, action) => {
    switch (action.type) {
        case USER_DELETE_REQUEST:
            return {
                loading : true
            }
        case USER_DELETE_SUCCESS:
            return {
                loading : false,
                success : true
            }
        case USER_DELETE_FAIL:
            return {
                loading : false,
                error : action.payload
            }
        default:
            return state
    }
}