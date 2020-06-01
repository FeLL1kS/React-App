import React from 'react'
import Profile from './Profile'
import { connect } from 'react-redux'
import { setUserProfile } from '../../redux/profileReducer'
import { withRouter } from 'react-router-dom'
import { profileAPI, authAPI } from '../../api/api'

class ProfileContainer extends React.Component {
    
    componentDidMount()
    {
        authAPI.me().then(data => {
            if(data.resultCode === 0)
            {
                let userId = this.props.match.params.userId ? this.props.match.params.userId : data.data.userId
                profileAPI.profileInfo(userId).then(data => this.props.setUserProfile(data))
            }
        })
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
    setUserProfile
}

let WithUrlDataContainerComponent = withRouter(ProfileContainer)

export default connect(mapStateToProps, mapActionToProps)(WithUrlDataContainerComponent)