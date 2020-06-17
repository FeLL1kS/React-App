/// TO DO
/// Styles (grid), profile page like vk
/// API
///

import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import News from './components/News/News'
import Music from './components/Music/Music'
import UsersContainer from './components/Users/UsersContainer';
import { Route, Redirect } from 'react-router-dom';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';
import { connect } from 'react-redux';
import { initializing } from './redux/appReducer';
import Preloader from './components/common/preloader/Preloader';
import EditContainer from './components/Edit/EditContainer';

class App extends React.Component  {
  componentDidMount()
  {
    this.props.initializing()
  }

  render()
  {
    if(!this.props.initialized)
      return <div className="preloader"><Preloader /><div>Loading...</div></div>

    return (
        <div className='app-wrapper'>
          <HeaderContainer />
          <Navbar />
          <div className='app-wraper-content block'>
            <Route render={ () => <Redirect to='/profile' /> } exact={true} path='/' />
            <Route render={ () => <ProfileContainer /> } path='/profile/:userId?'/>
            <Route render={ () => <DialogsContainer />} path='/dialogs/:dialogId?' />
            <Route component={Login} path='/login' />
            <Route component={News} path='/news' />
            <Route component={Music} path='/music' />
            <Route component={EditContainer} path='/edit' />
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
