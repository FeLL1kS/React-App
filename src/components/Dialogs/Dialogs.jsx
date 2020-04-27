import React from 'react'
import classes from './Dialogs.module.css'
import avatar from '../../img/avatar.jpg'
import { NavLink } from 'react-router-dom'

const DialogItem = (props) => {
    return (
        <div className={classes.dialog + ' ' + classes.active}>
            <NavLink to={"/dialogs/" + props.id}>
                <span><img src={props.avatar}></img></span><span>{props.name}</span>
            </NavLink>
        </div>
    )
}

const Message = (props) => {
    return <div className={classes.message}>{props.message}</div>
}

const Dialogs = () => {
    return (
        <div className={classes.dialogs}>
            <div className={classes.dialogs__items}>
                <span className={classes.header}>DIALOGS</span>
                <DialogItem name="Oleg Vojtovich" id="1" avatar={avatar}/>
                <DialogItem name="Dima Vojtovich" id="2" avatar={avatar}/>
                <DialogItem name="Mariya Vojtovich" id="3" avatar={avatar}/>
                <DialogItem name="Valentine Vojtovich" id="4" avatar={avatar}/>
            </div>
            <span className={classes.border}></span>
            <div className={classes.messages}>
                <Message message = "Hi" />
                <Message message = "How are you" />
                <Message message = "I'm fine" />
            </div>
        </div>
    )
}

export default Dialogs
