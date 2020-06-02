import { authAPI, profileAPI } from "../api/api"

const ADD_POST = 'ADD-POST'
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT'
const SET_USER_PROFILE = 'SET-USER-PROFILE'

let initialState = {
    postsData: [
        { id: '1', message: 'Hello, World!', countLikes: '10' },
        { id: '2', message: 'First Post!', countLikes: '15'},
        { id: '3', message: 'Haha', countLikes: '24' },
        { id: '4', message: 'Hello', countLikes: '43' },
    ],
    newPostText: '',
    profile: {
        contacts: { }
    }
}

const profileReducer = (state = initialState, action) => {
    
    switch(action.type)
    {
        case ADD_POST:
            let newPost = {
                id: '5',
                message: state.newPostText,
                countLikes: '0'
            }
            return {
                ...state,
                newPostText: '',
                postsData: [...state.postsData, newPost],
            };
        case UPDATE_NEW_POST_TEXT:
            return {
                ...state,
                newPostText: action.newText
            };
        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.payload
            }
        default:
            return state
    }
}

export const addPostCreator = () => ({ type: ADD_POST })
export const updateNewPostTextCreator = (value) => ({ type: UPDATE_NEW_POST_TEXT, newText: value })
export const setUserProfile = (payload) => ({ type: SET_USER_PROFILE, payload })

export const getProfile = (userId) => (dispatch) => {
    authAPI.me().then(data => {
        if(data.resultCode === 0)
        {
            profileAPI.profileInfo(userId ? userId : data.data.userId).then(data => dispatch(setUserProfile(data)))
        }
    })
} 

export default profileReducer