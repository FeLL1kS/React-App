import React from 'react'
import Post from './Post/Post'
import classes from './MyPosts.module.css';
import { updateNewPostTextCreator, addPostCreator } from '../../../redux/profileReducer';

const MyPost = (props) => {
    const newPostElement = React.createRef();
   
    const addPost = () => {
        props.dispatch(addPostCreator())
    }

    const handleInputChange = e => {
        const value = e.target.value
        props.dispatch(updateNewPostTextCreator(value))
    }
    return (
        <div className={props.col__other}>
            <span>My posts</span>
            <div className={classes.addPost}>
                <textarea placeholder="Type your post" onChange={handleInputChange} ref={newPostElement} value={props.profilePage.newPostText}></textarea>
                <button onClick={addPost}>Add</button>
            </div>
            <div>
                {props.profilePage.postsData.map(post => <Post message={post.message} countLikes={post.countLikes} />)}
            </div>
        </div>
    )
}

export default MyPost;