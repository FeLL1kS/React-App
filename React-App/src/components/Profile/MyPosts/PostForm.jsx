import React from 'react'
import { reduxForm, Field } from 'redux-form';

const PostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field placeholder="Type your post" component={"textarea"} name={"newPostText"}/>
            <button>Add</button>
        </form>
    )
}

export default reduxForm({form: "post"})(PostForm)