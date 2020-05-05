import avatar from '../img/avatar.jpg'
import profileReducer from './profileReducer'
import dialogsReducers from './dialogsReducer'

let store = {
    _state: {
        profilePage: {
            postsData: [
                { id: '1', message: 'Hello, World!', countLikes: '10' },
                { id: '2', message: 'First Post!', countLikes: '15'},
                { id: '3', message: 'Haha', countLikes: '24' },
                { id: '4', message: 'Hello', countLikes: '43' },
            ],
            newPostText: ''   
        },
        dialogsPage: {
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
    },
    _callSubscriber() {
        console.log('State is changed')
    },

    subscribe(observer) {
        this._callSubscriber = observer // pattern observer
    },
    
    getState() {
        return this._state
    },

    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action)
        this._state.dialogsPage = dialogsReducers(this._state.dialogsPage, action)
        this._callSubscriber(this._state)
    }
}

export default store;