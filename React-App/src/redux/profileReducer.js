import { authAPI, profileAPI } from "../api/api"
import { getAuthInfo } from "./authReducer"

const ADD_POST = 'ADD-POST'
const SET_USER_PROFILE = 'SET-USER-PROFILE'
const UPDATE_STATUS_TEXT = 'UPDATE-STATUS-TEXT'
const LOADED_PROFILE = 'LOADED-PROFILE'
const SAVE_PHOTO_SUCCESS = 'SAVE-PHOTO-SUCCESS'

let initialState = {
    postsData: [
        { id: '1', message: 'Hello, World!', countLikes: '10' },
        { id: '2', message: 'First Post!', countLikes: '15'},
        { id: '3', message: 'Haha', countLikes: '24' },
        { id: '4', message: 'Hello', countLikes: '43' },
    ],
    profile: {
        contacts: { }
    },
    profileIsLoaded: false
}

const profileReducer = (state = initialState, action) => {
    
    switch(action.type)
    {
        case ADD_POST:
            let newPost = {
                id: '5',
                message: action.payload,
                countLikes: '0'
            }
            return {
                ...state,
                postsData: [...state.postsData, newPost],
            };
        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.payload
            }
        case UPDATE_STATUS_TEXT:
            return {
                ...state,
                profile: {...state.profile, status: action.payload}
            }
        case LOADED_PROFILE:
            return {
                ...state,
                profileIsLoaded: action.payload
            }
        case SAVE_PHOTO_SUCCESS:
            return {
                ...state,
                profile: {...state.profile, photo: action.payload}
            }
        default:
            return state
    }
}

export const addPost = (payload) => ({ type: ADD_POST, payload })
const setUserProfile = (payload) => ({ type: SET_USER_PROFILE, payload })
export const updateStatusText = (payload) => ({ type: UPDATE_STATUS_TEXT, payload })
export const profileLoaded = (payload) => ({ type: LOADED_PROFILE, payload })
export const savePhotoSuccess = (payload) => ({ type: SAVE_PHOTO_SUCCESS, payload })

export const getProfile = async (userId) => {
    let data = await authAPI.me()
    try
    {
        return profileAPI.profileInfo(userId ? userId : data.data.userId).then(data => data)
    }
    catch
    {
    }
}

export const setProfile = (userId) => async (dispatch) => {
    dispatch(profileLoaded(false))
    try
    {
        getProfile(userId).then(data => {
            dispatch(setUserProfile(data))
            dispatch(profileLoaded(true))
        })
    }
    catch
    {
    }
}

export const changeStatus = (status) => async (dispatch) => {
    await profileAPI.changeStatus(status)
    dispatch(updateStatusText(status))
}

export const savePhoto = (file) => async (dispatch) => {
    dispatch(profileLoaded(false))
    let response = await profileAPI.changeProfilePhoto(file)
    dispatch(savePhotoSuccess(response.data.data))
    dispatch(getAuthInfo())
    dispatch(profileLoaded(true))
}

export const saveProfileData = (profile) => async (dispatch) => {
    await profileAPI.changeProfileData(profile)
}

export default profileReducer