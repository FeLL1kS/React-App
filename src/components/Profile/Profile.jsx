import React from 'react'
import background from '../../img/background.jpg'
import classes from './Profile.module.css'
import MyPosts from './MyPosts/MyPosts'

const Profile = (props) => {

    return (
        <div className={classes.profile}>
            <div className={classes.col}>
                <img src={background} alt="background"></img>
            </div>
            <div className={classes.col__other}>
                ava + description
            </div>
            <MyPosts col__other={classes.col__other} postsData={props.postsData}/>
        </div>
    )
}

export default Profile;