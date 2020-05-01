import React from 'react'
import classes from './Dialogs.module.css'
import DialogItem from './DialogItem/DialogItem'
import Message from './Message/Message'

const Dialogs = (props) => {
    const newPostElement = React.createRef();
   
    const addPost = () => {
        let text = newPostElement.current.value
        alert(text)
    }

    return (
        <div className={classes.dialogs}>
            <div className={classes.dialogs__items}>
                <span className={classes.header}>DIALOGS</span>
                {props.state.dialogsData.map(dialog => <DialogItem name={dialog.name} id={dialog.id} avatar={dialog.avatar.avatar} />)}
            </div>
            <span className={classes.border}></span>
            <div className={classes.messages}>
                {props.state.messagesData.map(message => <Message message={message} />)}
                <div>
                    <textarea ref={newPostElement} style={{width:'100%'}}></textarea>
                    <button onClick={addPost} style={{float: 'right'}}>Add</button>
                </div>
            </div>
        </div>
    )
}

export default Dialogs
