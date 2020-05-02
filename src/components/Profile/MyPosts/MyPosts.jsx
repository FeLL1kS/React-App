import React from 'react'
import Post from './Post/Post'
import classes from './MyPosts.module.css';

const MyPost = (props) => {
    const newPostElement = React.createRef();
   
    const addPost = () => {
        props.dispatch({type: 'ADD-POST'})
    }

    const handleInputChange = e => {
        const value = e.target.value
        props.dispatch({type: 'UPDATE-NEW-POST-TEXT', newText: value})
    }
    return (
        <div className={props.col__other}>
            <span>My posts</span>
            <div className={classes.addPost}>
                <textarea onChange={handleInputChange} ref={newPostElement} value={props.profilePage.newPostText}></textarea>
                <button onClick={addPost}>Add</button>
            </div>
            <div>
                {props.profilePage.postsData.map(post => <Post message={post.message} countLikes={post.countLikes} />)}
            </div>
        </div>
    )
}

export default MyPost;