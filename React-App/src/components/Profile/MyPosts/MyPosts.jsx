import React from 'react'
import Post from './Post/Post'
import classes from './MyPosts.module.css';
import { reduxForm, Field } from 'redux-form';

const MyPost = (props) => {

    let onSubmit = (formData) => {
        console.log(formData);
        props.addPost(formData.newPostText)
    }

    return (
        <div className={props.col__other}>
            <span>My posts</span>
            <div className={classes.addPost}>
                <PostReduxForm onSubmit={onSubmit} newPostText={props.profilePage.newPostText} updateNewPostText={props.updateNewPostText} addPost={props.addPost}/>
            </div>
            <div>
                {props.profilePage.postsData.map(post => <Post key={post.id} message={post.message} countLikes={post.countLikes} />)}
            </div>
        </div>
    )
}

const PostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field placeholder="Type your post" component={"textarea"} name={"newPostText"}/>
            <button>Add</button>
        </form>
    )
}

const PostReduxForm = reduxForm({form: "post"})(PostForm)

export default MyPost;