import React from 'react'
import logo from '../../img/logo.png'
import classes from './Header.module.css'

const Header = () => {
    return (
        <header className={classes.header}>
            <a href='/profile'><img src={logo} /></a>
        </header>
    )
}

export default Header;