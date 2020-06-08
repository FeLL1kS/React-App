import { authAPI, profileAPI } from "../api/api";
import { stopSubmit } from "redux-form";

const SET_USER_DATA = 'SET-USER-DATA'
const SET_USER_PHOTO = 'SET-USER-PHOTO'

let initialState = {
    userId: null,
    isAuth: false,
    photo: ''
}

const authReducer = (state = initialState, action) => {
    
    switch(action.type)
    {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload,
            };
        case SET_USER_PHOTO:
            return {
                ...state,
                photo: action.payload
            }
        default:
            return state
    }
}

const setUserData = (payload) => ({ type: SET_USER_DATA, payload })
const setUserPhoto = (payload) => ({ type: SET_USER_PHOTO, payload })

export const getAuthInfo = () => async (dispatch) => {
    let data = await authAPI.me()   
    if(data.resultCode === 0)
    {
        dispatch(setUserData({...data.data, isAuth: true}))
        profileAPI.profileInfo(data.data.userId).then(data => dispatch(setUserPhoto(data.photo)))
    }
    if(data.resultCode === 1)
    {
        dispatch(setUserData({userId: null, isAuth: null, photo: ''}))
    }
}

export const login = (email, password) => async (dispatch) => {
    let response = await authAPI.login(email, password)
    if(response.data.resultCode === 0)
    {
        dispatch(getAuthInfo())
    }
    else
    {
        dispatch(stopSubmit("login", {_error: response.data.messages}))
    }
}

export const logout = () => async (dispatch) => {
    await authAPI.logout()
    dispatch(getAuthInfo())
}

export default authReducer