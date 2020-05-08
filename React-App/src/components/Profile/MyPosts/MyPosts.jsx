import React from 'react'
import Post from './Post/Post'
import classes from './MyPosts.module.css';

const MyPost = (props) => {
    const newPostElement = React.createRef();
   
    const addPost = () => {
        props.addPost()
    }

    const handleInputChange = e => {
        const value = e.target.value
        props.updateNewPostText(value)
    }
    return (
        <div className={props.col__other}>
            <span>My posts</span>
            <div className={classes.addPost}>
                <textarea placeholder="Type your post" onChange={handleInputChange} ref={newPostElement} value={props.profilePage.newPostText}></textarea>
                <button onClick={addPost}>Add</button>
            </div>
            <div>
                {props.profilePage.postsData.map(post => <Post key={post.id} message={post.message} countLikes={post.countLikes} />)}
            </div>
        </div>
    )
}

export default MyPost;