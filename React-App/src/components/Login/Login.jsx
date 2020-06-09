import React from 'react'
import classes from './Login.module.css'
import { login } from '../../redux/authReducer'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import LoginForm from './LoginForm'

class Login extends React.Component {
    onSubmit = (formData) => {
        this.props.login(formData.email, formData.password)
    }

    render()
    {
        if(this.props.isAuth) return <Redirect to='profile' /> 
        return (
            <div className={classes.login}>
                <LoginForm onSubmit={this.onSubmit}/>
            </div>
        )
    }
}

let mapActionToProps = {
    login   
}

let mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, mapActionToProps)(Login)
