import React from 'react'
import Profile from './Profile'
import { connect } from 'react-redux'
import { getProfile, updateStatusText, changeStatus, profileLoaded } from '../../redux/profileReducer'
import { withRouter, Redirect } from 'react-router-dom'
import { compose } from 'redux'

class ProfileContainer extends React.Component {
    
    componentDidMount()
    {        
        this.props.getProfile(this.props.match.params.userId)
        
    }

    componentWillUnmount()
    {
        this.props.profileLoaded()
    }

    render()
    {
        if(!this.props.currentUser && !this.props.match.params.userId)
        {
            return <Redirect to='/login' />
        }
        else
        {
            return <Profile {...this.props} profile={this.props.profile} profileIsLoaded={this.props.profileIsLoaded} />
        }
    }
    
}

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    profileIsLoaded: state.profilePage.profileIsLoaded,
    currentUser: state.auth.userId
})

let mapActionToProps = {
    getProfile,
    changeStatus,
    updateStatusText,
    profileLoaded
}

export default compose(
    connect(mapStateToProps, mapActionToProps),
    withRouter
)(ProfileContainer)