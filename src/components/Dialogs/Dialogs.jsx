import React from 'react'
import classes from './Dialogs.module.css'
import DialogItem from './DialogItem/DialogItem'
import Message from './Message/Message'

const Dialogs = (props) => {
    const newPostElement = React.createRef();

    const sendMessage = () => {
        props.sendMessage()
    }

    const handleInputChange = e => {
        const value = e.target.value
        props.updateNewMessageText(value)
    }

    return (
        <div className={classes.dialogs}>
            <div className={classes.dialogs__items}>
                <span className={classes.header}>DIALOGS</span>
                {props.dialogsPage.dialogsData.map(dialog => <DialogItem name={dialog.name} id={dialog.id} avatar={dialog.avatar.avatar} />)}
            </div>
            <span className={classes.border}></span>
            <div className={classes.messages}>
                {props.dialogsPage.messagesData.map(message => <Message message={message} />)}
                <div className={classes.messageBox}>
                    <textarea placeholder="Enter your message" ref={newPostElement} value={props.dialogsPage.newMessageText} onChange={handleInputChange}></textarea>
                    <button onClick={sendMessage}>Add</button>
                </div>
            </div>
        </div>
    )
}

export default Dialogs
