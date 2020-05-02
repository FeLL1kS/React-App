import React from 'react'
import classes from './Message.module.css'

const Message = (props) => {
    
    if(props.message.from === 'im')
    {
        return (
            <div className={classes.message + ' ' + classes.immessage} >
                <span>{props.message.message}</span>
                <span><img src={props.message.avatar.avatar} alt='avatar'></img></span>
            </div>
        )
    }
    else
    {
        return (
            <div className={classes.message + ' ' + classes.compmessage} >
                <span><img src={props.message.avatar.avatar} alt='avatar'></img></span>
                <span>{props.message.message}</span>
            </div>
        )
    }
}

export default Message;