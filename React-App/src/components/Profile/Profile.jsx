import React from 'react'
import classes from './Profile.module.css'
import MyPostsContainer from './MyPosts/MyPostsContainer'
import ProfileInfo from './ProfileInfo/ProfileInfo'

const Profile = (props) => {
    return (
        <div className={classes.profile}>
            <ProfileInfo    profile={props.profile} updateStatusText={props.updateStatusText} 
                            changeStatus={props.changeStatus} currentUser={props.currentUser}/>
            <MyPostsContainer col__other={classes.col__other}/>
        </div>
    )
}

export default Profile;