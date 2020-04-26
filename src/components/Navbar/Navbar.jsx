import React from 'react'
import classes from './Navbar.module.css'
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className={classes.nav}>
            <div>
                <div className={classes.nav__item}>
                    <NavLink to="/profile" activeClassName={classes.active}>
                        <i className="fa fa-home" aria-hidden="true"></i>
                        <div className={`${classes.navbar_button_text} ${classes.nav_button_text}`}>
                            Profile
                        </div>
                    </NavLink>
                </div>
                <div className={classes.nav__item}>
                    <NavLink to="/dialogs" activeClassName={classes.active}>
                        <i className="fa fa-comments" aria-hidden="true"></i>
                        <div className={`${classes.navbar_button_text} ${classes.nav_button_text}`}>
                            Messages
                        </div>
                    </NavLink>
                </div>
                <div className={classes.nav__item}>
                    <NavLink to="/news" activeClassName={classes.active}>
                        <i className="fa fa-file-text" aria-hidden="true"></i>
                        <div className={`${classes.navbar_button_text} ${classes.nav_button_text}`}>
                            News
                        </div>
                    </NavLink>
                </div>
                <div className={classes.nav__item}>
                    <NavLink to="/music" activeClassName={classes.active}>
                        <i className="fa fa-music" aria-hidden="true"></i>
                        <div className={`${classes.navbar_button_text} ${classes.nav_button_text}`}>
                            Music
                        </div>
                    </NavLink>
                </div>
                <div className={classes.nav__item}>
                    <NavLink to="/settings" activeClassName={classes.active}>
                        <i className="fa fa-cog" aria-hidden="true"></i>
                        <div className={`${classes.navbar_button_text} ${classes.nav_button_text}`}>
                            Settings
                        </div>
                    </NavLink>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;