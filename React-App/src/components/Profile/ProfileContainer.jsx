import React from 'react'
import Profile from './Profile'
import { connect } from 'react-redux'
import { getProfile } from '../../redux/profileReducer'
import { withRouter } from 'react-router-dom'
import { withAuthRedirect } from '../../hoc/withAuthRedirect'
import { compose } from 'redux'

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

export default compose(
    withAuthRedirect,
    connect(mapStateToProps, mapActionToProps),
    withRouter
)(ProfileContainer)