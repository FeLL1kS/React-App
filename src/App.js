import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import Dialogs from './components/Dialogs/Dialogs';
import News from './components/News/News'
import Music from './components/Music/Music'
import Settings from './components/Settings/Settings'
import { Route, BrowserRouter } from 'react-router-dom';

const App = (props) => {
  return (
    <BrowserRouter>
      <div className='app-wrapper'>
        <Header />
        <Navbar />
        <div className='app-wraper-content'>
          <Route render={ () => <Profile postsData={props.postsData}/> } path='/profile' />
          <Route render={ () => <Dialogs dialogsData={props.dialogsData} messagesData={props.messagesData}/>} path='/dialogs' />
          <Route component={News} path='/news' />
          <Route component={Music} path='/music' />
          <Route component={Settings} path='/settings' />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
