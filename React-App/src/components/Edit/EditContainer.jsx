import React from 'react'
import { connect } from 'react-redux'
import Edit from './Edit'
import { setProfile, saveProfileData } from '../../redux/profileReducer'
import { compose } from 'redux'
import { withAuthRedirect } from '../../hoc/withAuthRedirect'
import Preloader from '../common/preloader/Preloader'

class EditContainer extends React.Component {

    componentDidMount()
    {
        this.props.setProfile(this.props.userId)
    }
    
    onSubmit = (formData) => {
        this.props.saveProfileData(formData)
    }

    render()
    {
        return !this.props.profileIsLoaded ?  <Preloader /> 
        : <Edit initialValues={this.props.profile} onSubmit={this.onSubmit} profile={this.props.profile} profileIsLoaded={this.props.profileIsLoaded}/>
    }
    
}

let mapStateToProps = (state) => ({
    userId: state.auth.userId,
    profile: state.profilePage.profile,
    profileIsLoaded: state.profilePage.profileIsLoaded
})

let mapActionToProps = {
    setProfile,
    saveProfileData
}

export default compose(
    withAuthRedirect,
    connect(mapStateToProps, mapActionToProps),
)(EditContainer)