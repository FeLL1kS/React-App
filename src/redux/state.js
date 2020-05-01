import avatar from '../img/avatar.jpg'
import { rerenderEntireTree } from '../render'

let state = {
    profilePage: {
        postsData: [
            { id: '1', message: 'Hello, World!', countLikes: '10' },
            { id: '2', message: 'First Post!', countLikes: '15'},
            { id: '3', message: 'Haha', countLikes: '24' },
            { id: '4', message: 'Hello', countLikes: '43' },
        ]        
    },
    dialogsPage: {
        dialogsData: [
        { id: '1', name: 'Oleg Vojtovich', avatar: { avatar } },
        { id: '2', name: 'Dima Vojtovich', avatar: { avatar } },
        { id: '3', name: 'Mariya Vojtovich', avatar: { avatar } },
        { id: '4', name: 'Valentine Vojtovich', avatar: { avatar } },
        ],
        messagesData: [
        { id: '1', message: 'Hi', from: 'im', avatar: {avatar} },
        { id: '2', message: 'How are you?', from: 'im', avatar: {avatar} },
        { id: '3', message: 'I\'m fine, and you?', from: 'partner', avatar: {avatar} },
        { id: '4', message: 'Me too', from: 'im', avatar: {avatar} },
        ]
    }
}

export const addPost = (postMessage) => {
    let newPost = {
        id: 5,
        message: postMessage,
        countLikes: 0
    }
    state.profilePage.postsData.push(newPost)
    rerenderEntireTree(state);
}

export default state;