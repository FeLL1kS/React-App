import React from 'react'
import Post from './Post/Post'
import classes from './MyPosts.module.css';

const MyPost = (props) => {
    const newPostElement = React.createRef();
   
    const addPost = () => {
        let text = newPostElement.current.value
        props.addPost(text)
        newPostElement.current.value = ''
    }

    return (
        <div className={props.col__other}>
            <span>My posts</span>
            <div className={classes.addPost}>
                <textarea ref={newPostElement}></textarea>
                <button onClick={addPost}>Add</button>
            </div>
            <div>
                {props.postsData.map(post => <Post message={post.message} countLikes={post.countLikes} />)}
            </div>
        </div>
    )
}

export default MyPost;