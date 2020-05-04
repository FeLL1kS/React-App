import React from 'react'
import classes from './Dialogs.module.css'
import DialogItem from './DialogItem/DialogItem'
import Message from './Message/Message'
import { updateNewMessageTextCreator, sendMessageCreator } from '../../redux/dialogsReducer'

const Dialogs = (props) => {
    const newPostElement = React.createRef();

    const sendMessage = () => {
        props.dispatch(sendMessageCreator())
    }

    const handleInputChange = e => {
        const value = e.target.value
        props.dispatch(updateNewMessageTextCreator(value))
    }

debugger
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
