import React from 'react'
import classes from '../Profile.module.css'
import Post from './Post/Post'

const MyPost = () => {
    return (
        <div className={classes.col__other}>
            My posts
            <div>
                <textarea></textarea>
                <button>Add</button>
            </div>
            <div>
                <Post />
                <Post />
            </div>
        </div>
    )
}

export default MyPost;