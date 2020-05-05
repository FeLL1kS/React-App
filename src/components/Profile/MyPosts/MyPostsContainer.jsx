import React from 'react'
import { updateNewPostTextCreator, addPostCreator } from '../../../redux/profileReducer';
import MyPost from './MyPosts'

const MyPostContainer = (props) => {
    let state = props.store.getState()

    const addPost = () => {
        props.store.dispatch(addPostCreator())
    }

    const updateNewPostText = (value) => {
        props.store.dispatch(updateNewPostTextCreator(value))
    }
    return (<MyPost addPost={addPost} updateNewPostText={updateNewPostText} profilePage={state.profilePage} col__other={props.col__other}/>)
}

export default MyPostContainer;