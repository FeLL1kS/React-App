import React from 'react'
import classes from './FormControls.module.css'

export const Input = ({input, meta, ...props}) => {
    
    const hasError = meta.error && meta.touched
    
    return(
        <div className={classes.formControl + " " + (hasError && classes.error)}>
            <input {...input} {...props} />
            {hasError && <span>{meta.error}</span>}
        </div>
    )
}