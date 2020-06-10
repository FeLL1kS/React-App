import React from 'react'
import Profile from './Profile'
import { connect } from 'react-redux'
import { setProfile, updateStatusText, changeStatus, profileLoaded, savePhoto, saveProfileData } from '../../redux/profileReducer'
import { withRouter, Redirect } from 'react-router-dom'
import { compose } from 'redux'

class ProfileContainer extends React.Component {
    
    componentDidMount()
    {        
        this.props.setProfile(this.props.match.params.userId)
    }

    componentDidUpdate(prevProps)
    {        
        if(this.props.match.params.userId !== prevProps.match.params.userId)
            this.props.setProfile(this.props.match.params.userId)
    }

    render()
    {
        if(!this.props.currentUser && !this.props.match.params.userId)
        {
            return <Redirect to='/login' />
        }
        else
        {
            return <Profile {...this.props} profile={this.props.profile} profileIsLoaded={this.props.profileIsLoaded} saveProfileData={this.props.saveProfileData} />
        }
    }
    
}

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    profileIsLoaded: state.profilePage.profileIsLoaded,
    currentUser: state.auth.userId
})

let mapActionToProps = {
    setProfile,
    changeStatus,
    updateStatusText,
    profileLoaded,
    savePhoto,
    saveProfileData
}

export default compose(
    connect(mapStateToProps, mapActionToProps),
    withRouter
)(ProfileContainer)