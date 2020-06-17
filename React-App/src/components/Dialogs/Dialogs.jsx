import React from 'react'
import classes from './Dialogs.module.css'
import DialogItem from './DialogItem/DialogItem'
import Message from './Message/Message'
import { Field, reduxForm } from 'redux-form'

const Dialogs = (props) => {
    const onSubmit = (formData) => {
        props.sendMessage(formData.newMessageText)
    }

    return (
        <div className={classes.dialogs}>
            <div className={classes.dialogs__items}>
                <span className={classes.header}>DIALOGS</span>
                {props.dialogsPage.dialogsData.map(dialog => <DialogItem key={dialog.id} name={dialog.name} id={dialog.id} avatar={dialog.avatar} />)}
            </div>
            <span className={classes.border}></span>
            <div className={classes.messages}>
                {props.dialogsPage.messagesData.map(message => <Message key={message.id} message={message} />)}
                <MessageReduxForm onSubmit={onSubmit}/>
            </div>
        </div>
    )
}

const MessageForm = (props) => {
    return(
        <form onSubmit={props.handleSubmit} className={classes.messageBox}>
            <Field placeholder="Enter your message" component="textarea" name="newMessageText"/>
            <button>Add</button>
        </form>
    )
}

const MessageReduxForm = reduxForm({form: "message"})(MessageForm)

export default Dialogs
