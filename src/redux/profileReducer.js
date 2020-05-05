const ADD_POST = 'ADD-POST'
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT'

let initialState = {
    postsData: [
        { id: '1', message: 'Hello, World!', countLikes: '10' },
        { id: '2', message: 'First Post!', countLikes: '15'},
        { id: '3', message: 'Haha', countLikes: '24' },
        { id: '4', message: 'Hello', countLikes: '43' },
    ],
    newPostText: ''
}

const profileReducer = (state = initialState, action) => {
    switch(action.type)
    {
        case(ADD_POST):
        {
            let newPost = {
                id: '5',
                message: state.newPostText,
                countLikes: '0'
            }
            let newState = {...state}
            newState.postsData = [...state.postsData]
            newState.postsData.push(newPost)
            newState.newPostText = ''
            return newState
        }
        case(UPDATE_NEW_POST_TEXT):
            let newState = {...state}
            newState.newPostText = action.newText
            return newState
        default:
            return state
    }
}

export const addPostCreator = () => ({ type: ADD_POST })

export const updateNewPostTextCreator = (value) => ({ type: UPDATE_NEW_POST_TEXT, newText: value })

export default profileReducer