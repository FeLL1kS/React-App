import React, { Profiler } from 'react'
import classes from './Navbar.module.css'
import { NavLink } from 'react-router-dom';

const NavItem = (props) => {
    return (
        <div className={classes.nav__item}>
            <NavLink to={props.to.toLowerCase()} activeClassName={classes.active}>
                <i className={"fa " + props.icon} aria-hidden="true"></i>
                <div className={`${classes.navbar_button_text} ${classes.nav_button_text}`}>
                    {props.to}
            </div>
            </NavLink>
        </div>
    )
}

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