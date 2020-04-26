import React from 'react'
import classes from './Dialogs.module.css'
import avatar from '../../img/avatar.jpg'

const Dialogs = () => {
    return (
        <div className={classes.dialogs}>
            <div className={classes.dialogs__items}>
                <span>DIALOGS</span>
                <div className={classes.dialog + ' ' + classes.active}>
                    <span><img src={avatar}></img></span><span>Oleg</span>
                </div>
                <div className={classes.dialog}>
                    <span><img src={avatar}></img></span><span>Dima</span>
                </div>
                <div className={classes.dialog}>
                    <span><img src={avatar}></img></span><span>Mariya</span>
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
