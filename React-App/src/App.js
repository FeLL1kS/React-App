/// TO DO
/// Styles (grid), profile page like vk
/// API
///

import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import News from './components/News/News'
import Music from './components/Music/Music'
import Settings from './components/Settings/Settings'
import UsersContainer from './components/Users/UsersContainer';
import { Route } from 'react-router-dom';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';
import { connect } from 'react-redux';
import { initializing } from './redux/appReducer';

class App extends React.Component  {
  componentDidMount()
  {
    this.props.initializing()
  }

  render()
  {
    if(!this.props.initialized)
      return <div></div>  

    return (
        <div className='app-wrapper'>
          <HeaderContainer />
          <Navbar />
          <div className='app-wraper-content block'>
            <Route render={ () => <ProfileContainer /> } path='/profile/:userId?'/>
            <Route render={ () => <DialogsContainer />} path='/dialogs' />
            <Route component={Login} path='/login' />
            <Route component={News} path='/news' />
            <Route component={Music} path='/music' />
            <Route component={Settings} path='/settings' />
            <Route component={UsersContainer} path='/users' />
          </div>
        </div>
    );
  }
}

let mapStateToProps = (state) => ({
  initialized: state.app.initialized
})
let mapActionToProps = {
  initializing
}

export default connect(mapStateToProps, mapActionToProps)(App);
