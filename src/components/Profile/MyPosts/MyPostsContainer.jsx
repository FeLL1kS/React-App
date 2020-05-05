import { updateNewPostTextCreator, addPostCreator } from '../../../redux/profileReducer';
import MyPost from './MyPosts'
import { connect } from 'react-redux';

let mapStateToProps = (state) => {
    return {
        profilePage: state.profilePage
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        updateNewPostText: (value) => {
            dispatch(updateNewPostTextCreator(value))
        },
        addPost: () => {
            dispatch(addPostCreator())
        } 
    }
}

const MyPostContainer = connect(mapStateToProps, mapDispatchToProps)(MyPost)

export default MyPostContainer;