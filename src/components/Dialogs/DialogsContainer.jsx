import React from 'react'
import { updateNewMessageTextCreator, sendMessageCreator } from '../../redux/dialogsReducer'
import Dialogs from './Dialogs'

const DialogsContainer = (props) => {
    let state = props.store.getState()

    const sendMessage = () => {
        props.store.dispatch(sendMessageCreator())
    }

    const updateNewMessageText = value => {
        props.store.dispatch(updateNewMessageTextCreator(value))
    }
    return (<Dialogs sendMessage={sendMessage} updateNewMessageText={updateNewMessageText} dialogsPage={state.dialogsPage}/>)
}

export default DialogsContainer
