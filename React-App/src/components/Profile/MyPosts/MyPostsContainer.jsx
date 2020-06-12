import { addNewPost } from '../../../redux/profileReducer';
import MyPost from './MyPosts'
import { connect } from 'react-redux';

let mapStateToProps = (state) => {
    return {
        profilePage: state.profilePage
    }
}

let mapActionToProps = {
    addNewPost
}

export default connect(mapStateToProps, mapActionToProps)(MyPost)