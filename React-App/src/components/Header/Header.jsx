import React from 'react'
import logo from '../../img/logo.png'
import classes from './Header.module.css'
import { NavLink } from 'react-router-dom'

const Header = () => {
    return (
        <header className={classes.header}>
            <NavLink to='/profile'><img src={logo} alt="logo" /></NavLink>
        </header>
    )
}

export default Header;