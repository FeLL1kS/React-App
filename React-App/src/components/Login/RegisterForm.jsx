import React from 'react'
import { reduxForm, Field } from 'redux-form'
import { Input } from '../common/FormControls/FormControls'
import { required } from '../utils/validators/validators'
import inheritedClasses from '../common/FormControls/FormControls.module.css'
import classes from './Login.module.css'

let RegisterForm = (props) => {
    return (
        <div className={classes.auth}>
            <form onSubmit={props.handleSubmit}>
                <div className={classes.inputForm}>
                    <Field placeholder="Email" component={Input} name="email" type="text" validate={[required]}/>
                </div>                    
                <div className={classes.inputForm}>
                    <Field placeholder="Password" component={Input} name="password" type="password" validate={[required]}/>
                </div>
                <div className={classes.inputForm}>
                    <Field placeholder="Confirm Password" component={Input} name="confirmPassword" type="password" validate={[required]}/>
                </div>
                <div className={classes.inputForm}>
                    <Field placeholder="Your Name" component={Input} name="name" type="text" validate={[required]}/>
                </div>
                <div className={classes.inputForm}>
                    <Field placeholder="Your Surname" component={Input} name="surname" type="text" validate={[required]}/>
                </div>
                <div className={classes.inputForm}>
                    <Field component="select" name="locationId">
                        <option value="null"/>
                        {props.locations.map(l => <option key={l.id} value={l.id}>{l.city + ', ' + l.country}</option>)}
                    </Field>
                </div>
                <div className={classes.inputForm}>
                    <Field component={Input} type="checkbox" name="lookingForAJob" />
                </div>
                <div className={classes.inputForm}>
                    <Field placeholder="Looking for a job description" component={Input} name="lookingForAJobDescription" type="text" />
                </div>
                <div className={classes.inputForm}>
                    <Field placeholder="github" component={Input} name={"contacts.github"}/>
                </div>
                <div className={classes.inputForm}>
                    <Field placeholder="vk" component={Input} name={"contacts.vk"}/>
                </div>
                <div className={classes.inputForm}>
                    <Field placeholder="facebook" component={Input} name={"contacts.facebook"}/>
                </div>
                <div className={classes.inputForm}>
                    <Field placeholder="instagram" component={Input} name={"contacts.instagram"}/>
                </div>
                <div className={classes.inputForm}>
                    <Field placeholder="twitter" component={Input} name={"contacts.twitter"}/>
                </div>
                <div className={classes.inputForm}>
                    <Field placeholder="website" component={Input} name={"contacts.website"}/>
                </div>
                <div className={classes.inputForm}>
                    <Field placeholder="youtube" component={Input} name={"contacts.youtube"}/>
                </div>
                {props.error && <div className={inheritedClasses.formError}>
                    {props.error}
                </div>}
                <div className={classes.inputForm}>
                    <input onClick={props.setRegisterMode} type="submit" name="register" value="Return"/>
                    <input type="submit" name="submit" value="Sign up"/>
                </div>
            </form>
        </div>
    )
}

export default reduxForm({ form: 'register' })(RegisterForm)