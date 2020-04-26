import React from 'react'
import classes from './Navbar.module.css'

const Navbar = () => {
    return (
        <nav className={classes.nav}>
            <div>
                <div className={classes.nav__item}>
                    <a href="/profile">
                        <i className="fa fa-home" aria-hidden="true"></i>
                        <div className={`${classes.navbar_button_text} ${classes.nav_button_text}`}>
                            Profile
                        </div>
                    </a>
                </div>
                <div className={classes.nav__item}>
                    <a href="/dialogs">
                        <i className="fa fa-comments" aria-hidden="true"></i>
                        <div className={`${classes.navbar_button_text} ${classes.nav_button_text}`}>
                            Messages
                        </div>
                    </a>
                </div>
                <div className={classes.nav__item}>
                    <a href="/news">
                        <i className="fa fa-file-text" aria-hidden="true"></i>
                        <div className={`${classes.navbar_button_text} ${classes.nav_button_text}`}>
                            News
                        </div>
                    </a>
                </div>
                <div className={classes.nav__item}>
                    <a href="/music">
                        <i className="fa fa-music" aria-hidden="true"></i>
                        <div className={`${classes.navbar_button_text} ${classes.nav_button_text}`}>
                            Music
                        </div>
                    </a>
                </div>
                <div className={classes.nav__item}>
                    <a href="/settings">
                        <i className="fa fa-cog" aria-hidden="true"></i>
                        <div className={`${classes.navbar_button_text} ${classes.nav_button_text}`}>
                            Settings
                        </div>
                    </a>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;