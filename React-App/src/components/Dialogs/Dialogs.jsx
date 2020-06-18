import React, { useEffect } from 'react'
import classes from './Dialogs.module.css'
import DialogItem from './DialogItem/DialogItem'
import Message from './Message/Message'
import { Field, reduxForm } from 'redux-form'

const Dialogs = (props) => {
    const onSubmit = (formData) => {
        props.sendMessage(props.match.params.dialogId, formData.newMessageText)
    }

    let myRef = React.createRef();

    useEffect(() => {
        if(myRef.current !== null)
            myRef.current.scrollTop = myRef.current.scrollHeight
    }, [props.dialogsPage.messagesData])


    return (
        <div className={classes.dialogs}>
            <div className={classes.dialogs__items}>
                <span className={classes.header}>DIALOGS</span>
                {props.dialogsPage.dialogsData.map(dialog => <DialogItem key={dialog.id} name={dialog.name} id={dialog.id} avatar={dialog.avatar} />)}
            </div>
            <span className={classes.border}></span>
            <div className={(props.dialogsPage.currentDialogId === null ? classes.select : '')}>
                {props.dialogsPage.currentDialogId !== null &&
                    <>
                        <div className={classes.messages} ref={myRef}>
                            {props.dialogsPage.messagesData.map(message => <Message key={message.id} message={message} />)}
                        </div>
                        <MessageReduxForm onSubmit={onSubmit}/>
                    </>
                }
                {props.dialogsPage.currentDialogId === null &&
                    <>Выберите диалог из списка диалогов слева</>
                }
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
