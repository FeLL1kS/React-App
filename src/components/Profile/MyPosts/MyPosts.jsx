import React from 'react'
import Post from './Post/Post'

const MyPost = (props) => {

    let postsData = [
        { id: '1', message: 'Hello, World!', countLikes: '10' },
        { id: '2', message: 'First Post!', countLikes: '15'},
        { id: '3', message: 'Haha', countLikes: '24' },
        { id: '4', message: 'Hello', countLikes: '43' },
    ]

    return (
        <div className={props.col__other}>
            <span>My posts</span>
            <div>
                <textarea></textarea>
                <button>Add</button>
            </div>
            <div>
                {postsData.map(post => <Post message={post.message} countLikes={post.countLikes} />)}
            </div>
        </div>
    )
}

export default MyPost;