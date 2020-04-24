import React from 'react'
import classes from './Navbar.module.css'

const Navbar = () => {
    return (
        <nav className={classes.nav}>
            <div>
                <div className={classes.nav__item}>
                    <a href="#">
                        <i class="fa fa-home" aria-hidden="true"></i>
                        <div className={`${classes.navbar_button_text} ${classes.nav_button_text}`}>
                            Profile
                        </div>
                    </a>
                </div>
                <div className={classes.nav__item}>
                    <a href="#">
                        <i class="fa fa-comments" aria-hidden="true"></i>
                        <div className={`${classes.navbar_button_text} ${classes.nav_button_text}`}>
                            Messages
                        </div>
                    </a>
                </div>
                <div className={classes.nav__item}>
                    <a href="#">
                        <i class="fa fa-file-text" aria-hidden="true"></i>
                        <div className={`${classes.navbar_button_text} ${classes.nav_button_text}`}>
                            News
                        </div>
                    </a>
                </div>
                <div className={classes.nav__item}>
                    <a href="#">
                        <i class="fa fa-music" aria-hidden="true"></i>
                        <div className={`${classes.navbar_button_text} ${classes.nav_button_text}`}>
                            Music
                        </div>
                    </a>
                </div>
                <div className={classes.nav__item}>
                    <a href="#">
                        <i class="fa fa-cog" aria-hidden="true"></i>
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