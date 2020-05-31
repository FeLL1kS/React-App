import React from 'react'
import Profile from './Profile'
import axios from 'axios'
import { connect } from 'react-redux'
import { setUserProfile } from '../../redux/profileReducer'
import { withRouter } from 'react-router-dom'

class ProfileContainer extends React.Component {
    
    componentDidMount()
    {
        let userId = this.props.match.params.userId ? this.props.match.params.userId : '7' 
        axios.get("http://localhost:2669/api/profile/" + userId)
        .then(response => {
            this.props.setUserProfile(response.data)
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
    profile: state.profilePage.profile
})

let mapActionToProps = {
    setUserProfile
}

let WithUrlDataContainerComponent = withRouter(ProfileContainer)

export default connect(mapStateToProps, mapActionToProps)(WithUrlDataContainerComponent)