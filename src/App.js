import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import News from './components/News/News'
import Music from './components/Music/Music'
import Settings from './components/Settings/Settings'
import { Route } from 'react-router-dom';
import DialogsContainer from './components/Dialogs/DialogsContainer';

const App = (props) => {
  return (
      <div className='app-wrapper'>
        <Header />
        <Navbar />
        <div className='app-wraper-content'>
          <Route render={ () => <Profile /> } path='/profile' />
          <Route render={ () => <DialogsContainer />} path='/dialogs' />
          <Route component={News} path='/news' />
          <Route component={Music} path='/music' />
          <Route component={Settings} path='/settings' />
        </div>
      </div>
  );
}

export default App;
