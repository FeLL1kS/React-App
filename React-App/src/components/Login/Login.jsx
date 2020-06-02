import React from 'react'
import classes from './Login.module.css'
import Axios from 'axios'

class Login extends React.Component {
    onClickLogin = () => {
        Axios.post("http://localhost:2669/api/auth/login", 
        {
            "Email": "oleg5420@yandex.ru",
            "Password": "123456"
        },
        {
            withCredentials: true
        })
    } 
    
    render()
    {
        return (
            <div className={classes.login}>
                <button onClick={this.onClickLogin}>Login</button>
            </div>
        )
    }
}

export default Login
