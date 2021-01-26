import axios from "axios"
import { GET_ALL_USERS_FAIL, GET_ALL_USERS_REQUEST, GET_ALL_USERS_RESET, GET_ALL_USERS_SUCCESS, USER_DELETE_FAIL, USER_DELETE_REQUEST, USER_DELETE_SUCCESS, USER_DETAILS_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT_SUCCESS, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_UPDATE_PROFILE_FAIL, USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_SUCCESS } from "../constants/userConstants"

export const login = (email,password) => async(dispatch) => {
    try {
        dispatch({
            type : USER_LOGIN_REQUEST
        })

        const config = {
            headers : {
                'Content-Type' : "application/json"
            }
        }
        const {data} = await axios.post('/api/users/login', {email, password}, config)
        dispatch({
            type : USER_LOGIN_SUCCESS,
            payload : data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        dispatch({
            type : USER_LOGIN_FAIL,
            payload : error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const logout = () => (dispatch) => {
    dispatch({
        type : USER_LOGOUT_SUCCESS
    })
    dispatch({
        type : GET_ALL_USERS_RESET
    })
    localStorage.removeItem('userInfo')
}

export const registerUser = (name,email,password) => async(dispatch) => {
    try {
        dispatch({
            type : USER_REGISTER_REQUEST
        })
        const config = {
            headers : {
                'Content-Type' : 'application/json'
            }
        }

        const { data } = await axios.post('/api/users', { name, email, password }, config)
        dispatch({
            type : USER_REGISTER_SUCCESS,
            payload : data
        })

        dispatch({
            type : USER_LOGIN_SUCCESS,
            payload : data
        })

        localStorage.setItem('userInfo', JSON.stringify(data) )

    } catch (error) {
        dispatch({
            type : USER_REGISTER_FAIL,
            payload : error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const getUserDetails = (id) => async(dispatch,getState) => {
    try {
        dispatch({
            type : USER_DETAILS_REQUEST
        })
        const {userLogin : { userInfo }} = getState()

        const config = {
            headers : {
                "Content-Type" : "application/json",
                Authorization : `Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.get(`/api/users/${id}`, config)

        dispatch({
            type : USER_DETAILS_SUCCESS,
            payload : data
        })

    } catch (error) {
        dispatch({
            type : USER_DETAILS_FAIL,
            payload : error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const updateUserProfile = (user) => async (dispatch, getState) => {
    try {
        dispatch({
            type : USER_UPDATE_PROFILE_REQUEST,
        })

        const { userLogin : { userInfo }} = getState()

        const config = {
            headers: {
                "Content-Type" : "application/json",
                Authorization : `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.put('/api/users/profile', user, config)

        dispatch({
            type : USER_UPDATE_PROFILE_SUCCESS,
            payload : data
        })

    } catch (error) {
        dispatch({
            type : USER_UPDATE_PROFILE_FAIL,
            payload : error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const allUsers = () => async (dispatch, getState) => {
    try {
        dispatch({
            type : GET_ALL_USERS_REQUEST
        })

        const {userLogin : { userInfo }} = getState()
        const config = {
            headers : {
                Authorization : `Bearer ${userInfo.token}`,
            }
        }
        const {data} = await axios.get('/api/users', config)
        dispatch({
            type : GET_ALL_USERS_SUCCESS,
            payload : data
        })
    } catch (error) {
         dispatch({
             type : GET_ALL_USERS_FAIL,
             payload : error.response && error.response.data.message ? error.response.data.message : error.message
         })
    }
}

export const deleteUser = (id) => async(dispatch, getState) => {
    try {
        dispatch({
            type : USER_DELETE_REQUEST
        })

        const { userLogin : { userInfo }} = getState()

        const config = {
            headers : {
                Authorization : `Bearer ${userInfo.token}`
            }
        }

        await axios.delete(`/api/users/${id}`, config)
        dispatch({
            type : USER_DELETE_SUCCESS
        })

    } catch (error) {
        dispatch({
            type : USER_DELETE_FAIL,
            payload : error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }   
}