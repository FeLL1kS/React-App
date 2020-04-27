import React from 'react'
import classes from './Dialogs.module.css'
import DialogItem from './DialogItem/DialogItem'
import Message from './Message/Message'

const Dialogs = (props) => {

    return (
        <div className={classes.dialogs}>
            <div className={classes.dialogs__items}>
                <span className={classes.header}>DIALOGS</span>
                {props.dialogsData.map(dialog => <DialogItem name={dialog.name} id={dialog.id} avatar={dialog.avatar.avatar} />)}
            </div>
            <span className={classes.border}></span>
            <div className={classes.messages}>
                {props.messagesData.map(message => <Message message={message.message} />)}
            </div>
        </div>
    )
}

export default Dialogs
