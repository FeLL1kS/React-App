import { addPost } from '../../../redux/profileReducer';
import MyPost from './MyPosts'
import { connect } from 'react-redux';

let mapStateToProps = (state) => {
    return {
        profilePage: state.profilePage
    }
}

let mapActionToProps = {
    addPost
}

export default connect(mapStateToProps, mapActionToProps)(MyPost)