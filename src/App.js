import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import Dialogs from './components/Dialogs/Dialogs';
import News from './components/News/News'
import Music from './components/Music/Music'
import Settings from './components/Settings/Settings'
import { Route } from 'react-router-dom';

const App = (props) => {
  return (
      <div className='app-wrapper'>
        <Header />
        <Navbar />
        <div className='app-wraper-content'>
          <Route render={ () => <Profile profilePage={props.state.profilePage} dispatch={props.dispatch} /> } path='/profile' />
          <Route render={ () => <Dialogs dialogsPage={props.state.dialogsPage} dispatch={props.dispatch} />} path='/dialogs' />
          <Route component={News} path='/news' />
          <Route component={Music} path='/music' />
          <Route component={Settings} path='/settings' />
        </div>
      </div>
  );
}

export default App;
