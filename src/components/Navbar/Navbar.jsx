import React from 'react'
import classes from './Navbar.module.css'
import NavItem from './NavItem/NavItem';

const Navbar = () => {
    return (
        <nav className={classes.nav}>
            <div>
                <NavItem to = "Profile" icon = "fa-home"/>
                <NavItem to = "Dialogs" icon = "fa-comments"/>
                <NavItem to = "News" icon = "fa-file-text"/>
                <NavItem to = "Music" icon = "fa-music"/>
                <NavItem to = "Settings" icon = "fa-cog"/>
            </div>
        </nav>
    )
}

export default Navbar;