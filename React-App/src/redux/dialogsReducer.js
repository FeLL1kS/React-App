import avatar from '../img/avatar.jpg'

const SEND_MESSAGE = 'SEND-MESSAGE'

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
}

const dialogsReducers = (state = initialState, action) => {
    
    switch(action.type)
    {
        case(SEND_MESSAGE):
            let newMessage = {
                id: '5',
                message: action.payload,
                from: 'im',
                name: "Oleg Vojtovich",
                avatar: {avatar}
            }
            return {
                ...state,
                messagesData: [...state.messagesData, newMessage],
            }
        default:
            return state
    }
}

export const sendMessage = (payload) => ({ type: SEND_MESSAGE, payload })

export default dialogsReducers