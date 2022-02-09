import {createUserAPI, singInUserAPI} from "../../API/api_function";

const SET_USER_DATA = 'SET_USER_DATA'
const SET_IS_LOADING = 'SET_IS_LOADING'
const SET_MESSAGE = 'SET_MESSAGE'
const SET_IS_AUTH = 'SET_IS_AUTH'
const CLEAR_USER_DATA = 'CLEAR_USER_DATA'
const FAILED_LOG_IN = 'FAILED_LOG_IN'


const initialState = {
    isLoading: false,
    isUserCreate: null,
    isAuth: false,
    userFirstName: null,
    userLastName: null,
    isFailedLogIn: false
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA: {
            return {
                ...state,
                userFirstName: action.userFirstName,
                userLastName: action.userLastName,
            }
        }
        case SET_IS_LOADING: {
            return {
                ...state,
                isLoading: action.isLoading
            }
        }
        case SET_MESSAGE: {
            return {
                ...state,
                isUserCreate: action.check

            }
        }
        case SET_IS_AUTH: {
            return {
                ...state,
                isAuth: action.isAuth
            }
        }
        case CLEAR_USER_DATA: {
            return {
                ...state,
                userFirstName: null,
                userLastName: null,
            }
        }
        case FAILED_LOG_IN: {
            return {
                ...state,
                isFailedLogIn: action.isFailedLogIn
            }
        }
        default:
            return state
    }
}

export default authReducer

// ACTION CREATOR

export const setUserData = (userFirstName, userLastName) => ({type: SET_USER_DATA, userFirstName, userLastName})

export const setIsLoading = (isLoading) => ({type: SET_IS_LOADING, isLoading})

export const setIsUserCreate = (check) => ({type: SET_MESSAGE, check})

export const clearUserData = () => ({type: CLEAR_USER_DATA})

export const setIsAuth = (isAuth) => ({type: SET_IS_AUTH, isAuth})

export const setIsFailedLogIn = (isFailedLogIn) => ({type: FAILED_LOG_IN, isFailedLogIn})


// THUNK CREATOR

export const createUser = (userData) => async (dispatch) => {
    await createUserAPI(userData).then(check => {
        if (!check) {
            dispatch(setIsLoading(false))
            dispatch(setIsUserCreate(true))
        } else {
            dispatch(setIsLoading(false))
            dispatch(setIsUserCreate(false))
        }
    })
}

export const signIn = (email, password) => async (dispatch) => {
    await singInUserAPI(email, password).then(res => {
        if (res.isAuth) {
            dispatch(setIsAuth(res.isAuth))
            dispatch(setUserData(res.userFirstName, res.userLastName))
            dispatch(setIsLoading(false))
        } else {
            dispatch(setIsLoading(false))
            dispatch(setIsFailedLogIn(true))
        }
    })
}
