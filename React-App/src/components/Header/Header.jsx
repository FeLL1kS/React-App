import React from 'react'
import logo from '../../img/logo.png'
import classes from './Header.module.css'
import { NavLink } from 'react-router-dom'
import userPhoto from '../../img/User.png'
import Preloader from '../common/preloader/Preloader'

const Header = (props) => {
        return (
        <header className={classes.header}>
            <div className={classes.logo}>
                <NavLink to='/profile'><img src={logo} alt="logo" /></NavLink>
            </div>
            <div className={classes.loginBlock}>
                { props.isAuth ? <div>{props.email}</div> : <NavLink to='/login'>Login</NavLink> }
                {props.photo && <img src={(props.photo) != null ? props.photo : userPhoto } alt={props.isFetching ? <Preloader /> : null} />}
            </div>
        </header>
    )
}

export default Header;