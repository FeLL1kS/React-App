import avatar from '../img/avatar.jpg'

let store = {
    _state: {
        profilePage: {
            postsData: [
                { id: '1', message: 'Hello, World!', countLikes: '10' },
                { id: '2', message: 'First Post!', countLikes: '15'},
                { id: '3', message: 'Haha', countLikes: '24' },
                { id: '4', message: 'Hello', countLikes: '43' },
            ],
            newPostText: 'Type your post...'   
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
        switch(action.type)
        {
            case('ADD-POST'):
                let newPost = {
                    id: 5,
                    message: this._state.profilePage.newPostText,
                    countLikes: 0
                }
                this._state.profilePage.postsData.push(newPost)
                this._state.profilePage.newPostText = ''
                this._callSubscriber(this._state);
                break;
            case('UPDATE-NEW-POST-TEXT'):
                this._state.profilePage.newPostText = action.newText
                this._callSubscriber(this._state);
                break;
            case('SEND-MESSAGE'):
                let newMessage = {
                    id: '5',
                    message: this._state.dialogsPage.newMessageText,
                    from: 'im',
                    avatar: {avatar}
                }
                this._state.dialogsPage.messagesData.push(newMessage)
                this._state.dialogsPage.newMessageText = ''
                this._callSubscriber(this._state)
                break;
            case('UPDATE-NEW-MESSAGE-TEXT'):
                this._state.dialogsPage.newMessageText = action.newText
                this._callSubscriber(this._state)
                break;
            default:
                console.log('THERE ARE NO ACTION-TYPE LIKE ' + action.type)
                break;
        }
    }
}

export default store;