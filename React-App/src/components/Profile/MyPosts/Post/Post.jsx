import React from 'react'
import classes from './Post.module.css'

const Post = (props) => {
    return (
        <div className={classes.post}>
            <div>
                {props.message}
            </div>
            <div>
                {props.countLikes} likes
            </div>
        </div>
    )
}

export default Post;