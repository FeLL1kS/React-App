import React from 'react'
import logo from '../../img/logo.png'
import classes from './Header.module.css'
import { NavLink } from 'react-router-dom'
import userPhoto from '../../img/User.png'
import Preloader from '../common/preloader/Preloader'

const Header = (props) => {
        console.log(props);
        
        return (
        <header className={classes.header}>
            <div className={classes.logo}>
                <NavLink to='/profile'><img src={logo} alt="logo" /></NavLink>
            </div>
            <div className={classes.loginBlock}>
                <img src={(props.photo) != null ? props.photo : userPhoto } alt={props.isFetching ? <Preloader /> : null} />
                { props.isAuth ? props.userId : <NavLink to='/login'>Login</NavLink> }
            </div>
        </header>
    )
}

export default Header;