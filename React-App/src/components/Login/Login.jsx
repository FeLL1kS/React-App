import React from 'react'
import classes from './Login.module.css'
import { reduxForm, Field } from 'redux-form'
import { login, getAuthInfo } from '../../redux/authReducer'
import { connect } from 'react-redux'

class Login extends React.Component {
    onSubmit = (formData) => {
        console.log(formData)
        this.props.login(formData.login, formData.password).then(() => (this.props.getAuthInfo()))
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

let mapActionToProps = {
    login,
    getAuthInfo   
}

let mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, mapActionToProps)(Login)
