import { authAPI, profileAPI } from "../api/api"
import { getAuthInfo } from "./authReducer"

const ADD_POST = 'ADD-POST'
const SET_USER_PROFILE = 'SET-USER-PROFILE'
const UPDATE_STATUS_TEXT = 'UPDATE-STATUS-TEXT'
const LOADED_PROFILE = 'LOADED-PROFILE'
const SAVE_PHOTO_SUCCESS = 'SAVE-PHOTO-SUCCESS'

let initialState = {
    postsData: [],
    profile: {
        contacts: { }
    },
    profileIsLoaded: false
}

const profileReducer = (state = initialState, action) => {
    
    switch(action.type)
    {
        case ADD_POST:
            console.log(action);
                return {
                ...state,
                postsData: [...state.postsData, action.payload],
            };
        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile,
                postsData: action.postsData
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
const setUserProfile = (profile, postsData) => ({ type: SET_USER_PROFILE, profile, postsData })
export const updateStatusText = (payload) => ({ type: UPDATE_STATUS_TEXT, payload })
export const profileLoaded = (payload) => ({ type: LOADED_PROFILE, payload })
export const savePhotoSuccess = (payload) => ({ type: SAVE_PHOTO_SUCCESS, payload })

export const setProfile = (userId) => async (dispatch) => {
    dispatch(profileLoaded(false))
    let data = await authAPI.me()
    try
    {
        profileAPI.profileInfo(userId ? userId : data.data.userId).then(profileData => {
            profileAPI.getPosts(profileData.userId).then(postsData => {
                dispatch(setUserProfile(profileData, postsData))
                dispatch(profileLoaded(true))
            })
        })
    }
    catch
    {
    }
}

export const addNewPost = (postText) => async (dispatch, getState) => {
    profileAPI.addPost(getState().auth.userId, postText).then(data => {
        debugger
        dispatch(addPost({
            "id": data.id,
            "userId": data.userId,
            "post": data.post,
            "countLikes": data.countLikes,
            "postDate": data.postDate}))
        })
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