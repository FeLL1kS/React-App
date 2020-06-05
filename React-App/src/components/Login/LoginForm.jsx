import React from 'react'
import { reduxForm, Field } from 'redux-form'
import { Input } from '../common/FormControls/FormControls'
import { required } from '../utils/validators/validators'
import classes from '../common/FormControls/FormControls.module.css'

let LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder="Email" component={Input} name="email" validate={[required]}/>
            </div>                    
            <div>
                <Field placeholder="Password" component={Input} name="password" type="password" validate={[required]}/>
            </div>
            {props.error && <div className={classes.formError}>
                {props.error}
            </div>}
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

export default reduxForm({ form: 'login' })(LoginForm)