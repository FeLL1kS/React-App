import React from 'react'
import classes from './Dialogs.module.css'
import DialogItem from './DialogItem/DialogItem'
import Message from './Message/Message'

const Dialogs = (props) => {
    const newPostElement = React.createRef();
   
    const addPost = () => {
        props.store.sendMessage()
    }

    const handleInputChange = e => {
        const value = e.target.value
        props.store.updateNewMessageText(value)
    }

    return (
        <div className={classes.dialogs}>
            <div className={classes.dialogs__items}>
                <span className={classes.header}>DIALOGS</span>
                {props.store.getDialogsData().map(dialog => <DialogItem name={dialog.name} id={dialog.id} avatar={dialog.avatar.avatar} />)}
            </div>
            <span className={classes.border}></span>
            <div className={classes.messages}>
                {props.store.getMessagesData().map(message => <Message message={message} />)}
                <div className={classes.messageBox}>
                    <textarea ref={newPostElement} value={props.store.getNewMessageText()} onChange={handleInputChange}></textarea>
                    <button onClick={addPost}>Add</button>
                </div>
            </div>
        </div>
    )
}

export default Dialogs
