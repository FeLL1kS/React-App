import React from 'react'
import Post from './Post/Post'

const MyPost = (props) => {
    return (
        <div className={props.col__other}>
            My posts
            <div>
                <textarea></textarea>
                <button>Add</button>
            </div>
            <div>
                <Post message="Hello, World!" countLikes="10"/>
                <Post message="First Post!" countLikes="15"/>
            </div>
        </div>
    )
}

export default MyPost;