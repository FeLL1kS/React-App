import React from 'react'
import { NavLink } from 'react-router-dom'
import classes from './DialogItem.module.css'

const DialogItem = (props) => {
    return (
        <div className={classes.dialog + ' ' + classes.active}>
            <NavLink to={"/dialogs/" + props.id} activeClassName={classes.active}>
                <span><img src={props.avatar} alt="avatar"></img></span><span>{props.name}</span>
            </NavLink>
        </div>
    )
}
export default DialogItem;