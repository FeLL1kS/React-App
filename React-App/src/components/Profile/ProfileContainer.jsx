import React from 'react'
import Profile from './Profile'
import { connect } from 'react-redux'
import { getProfile } from '../../redux/profileReducer'
import { withRouter } from 'react-router-dom'

class ProfileContainer extends React.Component {
    
    componentDidMount()
    {
        this.props.getProfile(this.props.match.params.userId)
    }

    render()
    {
        return (
            <Profile {...this.props} profile={this.props.profile} />
        )
    }
    
}

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
})

let mapActionToProps = {
    getProfile
}

let WithUrlDataContainerComponent = withRouter(ProfileContainer)

export default connect(mapStateToProps, mapActionToProps)(WithUrlDataContainerComponent)