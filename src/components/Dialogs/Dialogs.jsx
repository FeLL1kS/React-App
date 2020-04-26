import React from 'react'
import classes from './Dialogs.module.css'
import avatar from '../../img/avatar.jpg'
import { NavLink } from 'react-router-dom'

const Dialogs = () => {
    return (
        <div className={classes.dialogs}>
            <div className={classes.dialogs__items}>
                <span>DIALOGS</span>
                <div className={classes.dialog + ' ' + classes.active}>
                    <NavLink to="/dialogs/1">
                        <span><img src={avatar}></img></span><span>Oleg</span>
                    </NavLink>
                </div>
                <div className={classes.dialog}>
                    <NavLink to="/dialogs/2">
                        <span><img src={avatar}></img></span><span>Dima</span>
                    </NavLink>
                </div>
                <div className={classes.dialog}>
                    <NavLink to="/dialogs/3">
                        <span><img src={avatar}></img></span><span>Mariya</span>
                    </NavLink>
                </div>
            </div>
            <span className={classes.border}></span>
            <div className={classes.messages}>
                <div className={classes.message}>Hi</div>
                <div className={classes.message}>How are you</div>
                <div className={classes.message}>I'm fine</div>
            </div>
        </div>
    )
}

export default Dialogs
