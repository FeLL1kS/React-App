import React from 'react'
import classes from './Profile.module.css'
import MyPostsContainer from './MyPosts/MyPostsContainer'
import ProfileInfo from './ProfileInfo/ProfileInfo'

const Profile = (props) => {
    return (
        <div className={classes.profile}>
            <ProfileInfo col__other={classes.col__other} col={classes.col} profile={props.profile}/>
            <MyPostsContainer col__other={classes.col__other}/>
        </div>
    )
}

export default Profile;