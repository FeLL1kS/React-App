import React from 'react'
import classes from './Message.module.css'

const Message = (props) => {
    
    if(props.message.from === 'im')
    {
        return (
            <div className={classes.message + ' ' + classes.immessage} >
                <span className={classes.name}>{props.message.name}</span>
                <span className={classes.message__text}>{props.message.message}</span>
                <span className={classes.avatar}><img src={props.message.avatar} alt='avatar'></img></span>
            </div>
        )
    }
    else
    {
        return (
            <div className={classes.message + ' ' + classes.compmessage} >
                <span className={classes.avatar}><img src={props.message.avatar} alt='avatar'></img></span>
                <span className={classes.name}>{props.message.name}</span>
                <span className={classes.message__text}>{props.message.message}</span>
            </div>
        )
    }
}

export default Message;