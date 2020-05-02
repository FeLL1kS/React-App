import avatar from '../img/avatar.jpg'

let rerenderEntireTree = () => {
    console.log('State is changed')
}

let state = {
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
}

export const addPost = (postMessage) => {
    let newPost = {
        id: 5,
        message: state.profilePage.newPostText,
        countLikes: 0
    }
    state.profilePage.postsData.push(newPost)
    state.profilePage.newPostText = ''
    rerenderEntireTree(state);
}

export const updateNewPostText = (newText) => {
    state.profilePage.newPostText = newText
    rerenderEntireTree(state);
}

export const sendMessage = (messageText) => {
    let newMessage = {
        id: '5',
        message: messageText,
        from: 'im',
        avatar: {avatar}
    }
    state.dialogsPage.messagesData.push(newMessage)
    state.dialogsPage.newMessageText = ''
    rerenderEntireTree(state)
}

export const updateNewMessageText = (newText) => {
    state.dialogsPage.newMessageText = newText
    rerenderEntireTree(state)
}

export const subscribe = observer => {
    rerenderEntireTree = observer // pattern observer
}

export default state;