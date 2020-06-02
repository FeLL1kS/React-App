import { authAPI, profileAPI } from "../api/api";

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
                isAuth: true
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

export const setUserData = (payload) => ({ type: SET_USER_DATA, payload })
export const setUserPhoto = (payload) => ({ type: SET_USER_PHOTO, payload })

export const getAuthInfo = () => (dispatch) => {
    authAPI.me().then(data => {
        if(data.resultCode === 0)
        {
            dispatch(setUserData(data.data))
            profileAPI.profileInfo(data.data.userId).then(data => {
                dispatch(setUserPhoto(data.photo))
            })
        }
    })
}

export default authReducer