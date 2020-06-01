import React from 'react'
import { connect } from 'react-redux';
import Header from './Header';
import axios from 'axios';
import { setUserData, setUserPhoto } from '../../redux/authReducer'

class HeaderContainer extends React.Component {
    componentDidMount()
    {
        axios.get("http://localhost:2669/api/auth/me", { withCredentials: true })
        .then(response => {
            if(response.data.resultCode === 0)
            {
                this.props.setUserData(response.data.data)
                axios.get("http://localhost:2669/api/profile/16", { withCredentials: true })
                .then(response => {
                    this.props.setUserPhoto(response.data.photo)
                })
            }
        })
    }

    render()
    {
        return <Header {...this.props} Auth={this.onClickAuth} />
    }
}

let mapStateToProps = (state) => ({
    ...state.auth
})

let mapActionToProps = {
    setUserData,
    setUserPhoto
}

export default connect(mapStateToProps, mapActionToProps)(HeaderContainer);