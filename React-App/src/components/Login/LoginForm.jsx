import React from 'react'
import { reduxForm, Field } from 'redux-form'
import { Input } from '../common/FormControls/FormControls'
import { required } from '../utils/validators/validators'
import inheritedClasses from '../common/FormControls/FormControls.module.css'
import classes from './Login.module.css'

let LoginForm = (props) => {
    return (
        <form className={classes.loginForm} onSubmit={props.handleSubmit}>
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
                <Field component={Input} type="submit" name="submit"/>
            </div>
        </form>
    )
}

export default reduxForm({ form: 'login' })(LoginForm)