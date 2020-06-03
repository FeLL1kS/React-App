import React from 'react'
import classes from './Login.module.css'
import { reduxForm, Field } from 'redux-form'
import Axios from 'axios'

class Login extends React.Component {
    // onClickLogin = () => {
    //     Axios.post("http://localhost:2669/api/auth/login", 
    //     {
    //         "Email": "oleg5420@yandex.ru",
    //         "Password": "123456"
    //     },
    //     {
    //         withCredentials: true
    //     })
    // } 
    onSubmit = (formData) => {
        console.log(formData)
        Axios.post("http://localhost:2669/api/auth/login", 
        {
            "Email": formData.login,
            "Password": formData.password
        },
        {
            withCredentials: true
        })
    }

    render()
    {
        return (
            <div className={classes.login}>
                <h1>Login</h1>
                <LoginReduxForm onSubmit={this.onSubmit}/>
            </div>
        )
    }
}

let LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={"Login"} component={"input"} name={"login"}/>
            </div>                    
            <div>
                <Field placeholder={"Password"} component={"input"} name={"password"}/>
            </div>
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

let LoginReduxForm = reduxForm({ form: 'login' })(LoginForm)
 
export default Login
