import React from 'react'
import { reduxForm, Field } from 'redux-form'
import { Input } from '../common/FormControls/FormControls'
import { required } from '../utils/validators/validators'
import inheritedClasses from '../common/FormControls/FormControls.module.css'
import classes from './Login.module.css'

let LoginForm = (props) => {
    return (
        <div className={classes.auth}>
            <form onSubmit={props.handleSubmit}>
                <div className={classes.inputForm}>
                    <Field placeholder="Email" component={Input} name="email" type="text" validate={[required]}/>
                </div>                    
                <div className={classes.inputForm}>
                    <Field placeholder="Password" component={Input} name="password" type="password" validate={[required]}/>
                </div>
                {props.error && <div className={inheritedClasses.formError}>
                    {props.error}
                </div>}
                <div className={classes.inputForm}>
                    <input onClick={props.setRegisterMode} type="submit" name="register" value="Sign up"/>
                    <input type="submit" name="submit" value="Sign in"/>
                </div>
            </form>
        </div>
    )
}

export default reduxForm({ form: 'login' })(LoginForm)