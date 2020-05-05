import React from 'react'
import background from '../../img/background.jpg'
import classes from './Profile.module.css'
import MyPostsContainer from './MyPosts/MyPostsContainer'

const Profile = (props) => {
    return (
        <div className={classes.profile}>
            <div className={classes.col}>
                <img src={background} alt="background"></img>
            </div>
            <div className={classes.col__other}>
                ava + description
            </div>
            <MyPostsContainer store={props.store} col__other={classes.col__other}/>
        </div>
    )
}

export default Profile;