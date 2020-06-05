import React from 'react'
import Post from './Post/Post'
import classes from './MyPosts.module.css';
import PostForm from './PostForm';

const MyPost = (props) => {

    let onSubmit = (formData) => {
        props.addPost(formData.newPostText)
    }

    return (
        <div className={classes.posts}>
            <span>My posts</span>
            <div className={classes.addPost}>
                <PostForm onSubmit={onSubmit}/>
            </div>
            <div>
                {props.profilePage.postsData.map(post => <Post key={post.id} message={post.message} countLikes={post.countLikes} />)}
            </div>
        </div>
    )
}



export default MyPost;