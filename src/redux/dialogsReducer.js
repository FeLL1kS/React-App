import avatar from '../img/avatar.jpg'

const SEND_MESSAGE = 'SEND-MESSAGE'
const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT'

let initialState = {
    dialogsData: [
        { id: '1', name: 'Oleg Vojtovich', avatar: { avatar } },
        { id: '2', name: 'Dima Vojtovich', avatar: { avatar } },
        { id: '3', name: 'Mariya Vojtovich', avatar: { avatar } },
        { id: '4', name: 'Valentine Vojtovich', avatar: { avatar } },
        ],
    messagesData: [
    { id: '1', message: 'Hi', from: 'im', name: 'Oleg Vojtovich', avatar: {avatar} },
    { id: '2', message: 'How are you?', from: 'im', name: 'Oleg Vojtovich', avatar: {avatar} },
    { id: '3', message: 'I\'m fine, and you?', from: 'comp', name: 'Dima Vojtovich', avatar: {avatar} },
    { id: '4', message: 'Me too', from: 'im', name: 'Oleg Vojtovich', avatar: {avatar} },
    ],
    newMessageText: ''
}

const dialogsReducers = (state = initialState, action) => {

    switch(action.type)
    {
        case(SEND_MESSAGE):
        {
            let newMessage = {
                id: '5',
                message: state.newMessageText,
                from: 'im',
                name: "Oleg Vojtovich",
                avatar: {avatar}
            }
            let newState = {...state}
            newState.messagesData = [...state.messagesData]
            newState.messagesData.push(newMessage)
            newState.newMessageText = ''
            return newState
        }
        case(UPDATE_NEW_MESSAGE_TEXT):
        {
            let newState = {...state}
            newState.newMessageText = action.newText
            return newState
        }
        default:
            return state
    }
}

export const sendMessageCreator = () => ({ type: SEND_MESSAGE })

export const updateNewMessageTextCreator = (value) => ({ type: UPDATE_NEW_MESSAGE_TEXT, newText: value })

export default dialogsReducers