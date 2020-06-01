import React from 'react'
import classes from './UsersItem.module.css'
import userPhoto from '../../../img/User.png'
import Preloader from '../../common/preloader/Preloader'
import { NavLink } from 'react-router-dom'
import axios from 'axios'

const UsersItem = (props) => {

    let printLocation = () => {
        if(props.user.location !== null)
        {
            return (<div className={classes.location}>
                        <div>{props.user.location.city},</div>
                        <div>{props.user.location.country}</div>
                    </div>)
        }
        else
        {
            return (<div className={classes.location}></div>)
        }
    }

    let onClickFollow = (id) => {
        axios.post("http://localhost:2669/api/follow/" + id, {}, {withCredentials: true})
            .then(response => {
                if(response.data.resultCode === 0)
                {
                    props.follow(id)
                }
            })
    }

    let onClickUnfollow = (id) => {
        axios.delete("http://localhost:2669/api/follow/" + id, {withCredentials: true})
            .then(response => {
                if(response.data.resultCode === 0)
                {
                    props.unfollow(id)
                }
            })
    }

    return (
        <div className={classes.container}>
            <div className={classes.avatar}>
                <NavLink to={'/profile/' + props.user.id}>
                        <div>
                            <img className={classes.profileImg} src={(props.user.photo) != null ? props.user.photo : userPhoto } alt={props.isFetching ? <Preloader /> : null} />
                        </div>
                </NavLink>
                <div>
                    {props.user.followed ? <button onClick={() => { onClickUnfollow(props.user.id) }}>Unfollow</button> 
                    : <button onClick={() => { onClickFollow(props.user.id) }}>Follow</button>}
                </div>
            </div>
            <div className={classes.infoPanel}>
                <div className={classes.user}>
                    <div className={classes.fullName}>{props.user.name}</div>
                    <div>{props.user.status}
                </div>
            </div>
            {printLocation()}
            </div>
        </div>
    )
}

export default UsersItem
