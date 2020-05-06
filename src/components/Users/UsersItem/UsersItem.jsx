import React from 'react'
import classes from './UsersItem.module.css'

const UsersItem = (props) => {
    return (
        <div className={classes.container}>
            <div className={classes.avatar}>
                <div>
                    <img className={classes.profileImg} src={props.user.avatar.avatar} alt="avatar" />
                </div>
                <div>
                    {props.user.followed ? <button onClick={() => { props.unfollow(props.user.id) }}>Unfollow</button> : <button onClick={() => { props.follow(props.user.id) }}>Follow</button>}
                </div>
            </div>
            <div className={classes.infoPanel}>
                <div className={classes.user}>
                    <div className={classes.fullName}>{props.user.fullName}</div>
                    <div>{props.user.status}</div>
                </div>
                <div className={classes.location}>
                    <div>{props.user.location.city},</div>
                    <div>{props.user.location.country}</div>
                </div>
            </div>
        </div>
    )
}

export default UsersItem
