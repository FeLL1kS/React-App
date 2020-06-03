import React from 'react'

class ProfileStatus extends React.Component {
    state = {
        editMode: false
    }

    enableEditMode = () => {
        if(parseInt(this.props.currentUser) === this.props.requestedUser)
        {
            this.setState( {
                editMode: true
            } )
        }
    }
    disableEditMode = () => {
        this.setState( {
            editMode: false
        } )
        this.props.changeStatus(this.props.status)
    }

    handleInputChange = e => {
        this.props.updateStatusText(e.target.value)
    }

    render()
    {
        return (
            <div>
                {!this.state.editMode ? <span onClick={this.enableEditMode}>{this.props.status}</span> 
                : <input autoFocus={true} onBlur={this.disableEditMode} onChange={this.handleInputChange} value={this.props.status} />}
            </div>
        )
    }
}

export default ProfileStatus