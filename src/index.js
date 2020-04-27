import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import avatar from './img/avatar.jpg'
import * as serviceWorker from './serviceWorker';

let postsData = [
  { id: '1', message: 'Hello, World!', countLikes: '10' },
  { id: '2', message: 'First Post!', countLikes: '15'},
  { id: '3', message: 'Haha', countLikes: '24' },
  { id: '4', message: 'Hello', countLikes: '43' },
]

let dialogsData = [
  { id: '1', name: 'Oleg Vojtovich', avatar: { avatar } },
  { id: '2', name: 'Dima Vojtovich', avatar: { avatar } },
  { id: '3', name: 'Mariya Vojtovich', avatar: { avatar } },
  { id: '4', name: 'Valentine Vojtovich', avatar: { avatar } },
]

let messagesData = [
  { id: '1', message: 'Hi' },
  { id: '2', message: 'How are you?' },
  { id: '3', message: 'I\'m fine, and you?' },
  { id: '4', message: 'Me too' },
]

ReactDOM.render(
  <React.StrictMode>
    <App postsData={postsData} dialogsData={dialogsData} messagesData={messagesData} />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
