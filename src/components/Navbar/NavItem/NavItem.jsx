import React from 'react'
import { NavLink } from 'react-router-dom';
import classes from './NavItem.module.css'

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

export default NavItem;