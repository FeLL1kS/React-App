import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { required } from '../../utils/validators/validators'
import { Input } from '../../common/FormControls/FormControls'
import classes from '../Profile.module.css'

const ProfileDataForm = ({profile, handleSubmit, onSubmit}) => {
    return  (
    <>
        <form className={classes.contacts} onSubmit={handleSubmit}>
            <button onSubmit={onSubmit}>Save</button>
            <div>
                <b>Full Name: </b><Field placeholder="Full Name" component={Input} name="fullName" validate={[required]}/>
            </div>
            <div>
                <b>Looking for a job: </b><Field placeholder="Looking for a job" component={Input} type="checkbox" name="lookingForAJob"/>
            </div>
            <div>
                <b>Looking for a job description: </b><Field placeholder="Decsription" component={Input} name="lookingForAJobDescription" validate={[required]}/>
            </div>

            {Object.keys(profile.contacts).map(key => {
                return key !== 'id' &&
                <div key={key}>
                    <b>{key}: </b><Field placeholder={key} component={Input} name={"contacts." + key}/>
                </div>
            })}
        </form>
    </>)
}

export default reduxForm({ form: 'profile' })(ProfileDataForm)