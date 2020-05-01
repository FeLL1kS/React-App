import React from 'react'
import classes from './Message.module.css'

const Message = (props) => {
    
    if(props.message.from === 'im')
    {
        let divStyle = {
            textAlign: 'start',
            paddingTop: '10px',
            paddingBottom: '10px',
            display: 'grid',
            gridTemplateColumns: '40px auto',
            gap: '15px',
            alignItems: 'center'
        }

        return (
            <div className={classes.message} style={divStyle}>
                <span><img src={props.message.avatar.avatar} alt='avatar'></img></span>
                <span>{props.message.message}</span>
            </div>
        )
    }
    else
    {
        let divStyle = {
            textAlign: 'end',
            paddingTop: '10px',
            paddingBottom: '10px',
            display: 'grid',
            gridTemplateColumns: 'auto 40px',
            gap: '15px',
            alignItems: 'center'
        }

        return (
            <div className={classes.message} style={divStyle}>
                <span>{props.message.message}</span>
                <span><img src={props.message.avatar.avatar} alt='avatar'></img></span>
            </div>
        )
    }
}

export default Message;