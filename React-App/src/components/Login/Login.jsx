import React, { useState } from 'react'
import { login, register, setLocs } from '../../redux/authReducer'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'

let Login = (props) => {

    const [registerMode, setRegisterMode] = useState(false)

    let onSubmitLogin = (formData) => {
        props.login(formData.email, formData.password)
    }

    let onSubmitRegister = (formData) => {
        props.register(formData)
    }

    if(props.isAuth) return <Redirect to='profile' />
    return !registerMode 
    ? <LoginForm setRegisterMode={() => {setRegisterMode(true); props.setLocs()}} onSubmit={onSubmitLogin}/>
    : <RegisterForm locations={props.locations} setRegisterMode={() => {setRegisterMode(false)}} onSubmit={onSubmitRegister}/>
}

let mapActionToProps = {
    login,
    register,
    setLocs
}

let mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    locations: state.auth.locations
})

export default connect(mapStateToProps, mapActionToProps)(Login)
