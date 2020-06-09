import React, { useState, useEffect } from 'react'

let ProfileStatusWithHooks = (props) => {
    const [editMode, setEditMode] = useState(false)
    const [status, setStatus] = useState(props.status)

    // Чтобы статус догрузился, не потерялся и попал в локальный state используется useEffect
    useEffect(() => {
        setStatus(props.status)
    }, [props.status])

    let enableEditMode = () => {
        if(props.isOwner)
        {
            setEditMode(true)
        }
    }
    let disableEditMode = () => {
        setEditMode(false)
        props.changeStatus(status)
    }

    let handleInputChange = e => {
        setStatus(e.target.value)
    }

    return (
        <div>
            {!editMode ? <span onClick={enableEditMode}>{!props.status ? "-------" : props.status}</span> 
            : <input autoFocus={true} type="text" onBlur={disableEditMode} onChange={handleInputChange} value={status} />}
        </div>
    )
    
}

export default ProfileStatusWithHooks