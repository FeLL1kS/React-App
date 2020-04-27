import React from 'react'
import Post from './Post/Post'

const MyPost = (props) => {
    return (
        <div className={props.col__other}>
            <span>My posts</span>
            <div>
                <textarea></textarea>
                <button>Add</button>
            </div>
            <div>
                {props.postsData.map(post => <Post message={post.message} countLikes={post.countLikes} />)}
            </div>
        </div>
    )
}

export default MyPost;