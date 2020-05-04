const ADD_POST = 'ADD-POST'
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT'

const profileReducer = (state, action) => {
    debugger
    switch(action.type)
    {
        case(ADD_POST):
            let newPost = {
                id: '5',
                message: state.newPostText,
                countLikes: '0'
            }
            state.postsData.push(newPost)
            state.newPostText = ''
            return state
        case(UPDATE_NEW_POST_TEXT):
            state.newPostText = action.newText
            return state
        default:
            console.log('THERE ARE NO ACTION-TYPE LIKE ' + action.type)
            return state
    }
}

export const addPostCreator = () => ({ type: ADD_POST })

export const updateNewPostTextCreator = (value) => ({ type: UPDATE_NEW_POST_TEXT, newText: value })

export default profileReducer