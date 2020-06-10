import React from 'react'
import classes from './UsersItem.module.css'
import userPhoto from '../../../img/User.png'
import Preloader from '../../common/preloader/Preloader'
import { NavLink } from 'react-router-dom'

const UsersItem = (props) => {

    let onClickFollow = (id) => {
        props.following(id)
    }

    let onClickUnfollow = (id) => {
        props.following(id, false)
    }
    
    return (
        <div className={classes.container}>
            <div className={classes.avatar}>
                <NavLink to={'/profile/' + props.user.id}>
                        <div>
                            <img className={classes.profileImg} src={(props.user.photo) != null ? props.user.photo : userPhoto } alt={props.isFetching ? <Preloader /> : null} />
                        </div>
                </NavLink>
                {props.currentUserId !== props.user.id && props.currentUserId && <div>
                    {props.user.followed ? <button className={classes.followButton} disabled={props.followingInProgress.some(id => id === props.user.id)} onClick={() => { onClickUnfollow(props.user.id) }}>Unfollow</button> 
                    : <button className={classes.followButton} disabled={props.followingInProgress.some(id => id === props.user.id) || props.currentUserId === props.user.id} onClick={() => { onClickFollow(props.user.id) }}>Follow</button>}
                </div>}
            </div>
            <div className={classes.infoPanel}>
                <div className={classes.user}>
                    <div className={classes.fullName}>{props.user.name}</div>
                    <div>{props.user.status}
                </div>
            </div>
            {props.user.location && 
            <div className={classes.location}>
                <div>{props.user.location.city},</div>
                <div>{props.user.location.country}</div>
            </div>}
            </div>
        </div>
    )
}

export default UsersItem
