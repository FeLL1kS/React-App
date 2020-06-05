import { authAPI, profileAPI } from "../api/api"

const ADD_POST = 'ADD-POST'
const SET_USER_PROFILE = 'SET-USER-PROFILE'
const UPDATE_STATUS_TEXT = 'UPDATE-STATUS-TEXT'
const LOADED_PROFILE = 'LOADED-PROFILE'

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
                profileIsLoaded: !state.profileIsLoaded
            }
        default:
            return state
    }
}

export const addPost = (payload) => ({ type: ADD_POST, payload })
const setUserProfile = (payload) => ({ type: SET_USER_PROFILE, payload })
export const updateStatusText = (payload) => ({ type: UPDATE_STATUS_TEXT, payload })
export const profileLoaded = () => ({ type: LOADED_PROFILE })

export const getProfile = (userId) => (dispatch) => {
    authAPI.me().then(data => {
        try
        {
            profileAPI.profileInfo(userId ? userId : data.data.userId).then(data => {
                dispatch(setUserProfile(data))
                dispatch(profileLoaded())
            })
        }
        catch
        {
        }
    })
}

export const changeStatus = (status) => (dispatch) => {
    profileAPI.changeStatus(status)
}

export default profileReducer