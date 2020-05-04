import avatar from '../img/avatar.jpg'

const SEND_MESSAGE = 'SEND-MESSAGE'
const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT'

const dialogsReducers = (state, action) => {

    switch(action.type)
    {
        case(SEND_MESSAGE):
            let newMessage = {
                id: '5',
                message: state.newMessageText,
                from: 'im',
                avatar: {avatar}
            }
            state.messagesData.push(newMessage)
            state.newMessageText = ''
            return state
        case(UPDATE_NEW_MESSAGE_TEXT):
            state.newMessageText = action.newText
            return state
        default:
            console.log('THERE ARE NO ACTION-TYPE LIKE ' + action.type)
            return state
    }
}

export const sendMessageCreator = () => ({ type: SEND_MESSAGE })

export const updateNewMessageTextCreator = (value) => ({ type: UPDATE_NEW_MESSAGE_TEXT, newText: value })

export default dialogsReducers