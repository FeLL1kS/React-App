import React from 'react'
import { connect } from 'react-redux';
import Header from './Header';
import { setUserData, setUserPhoto } from '../../redux/authReducer'
import { authAPI, profileAPI } from '../../api/api';

class HeaderContainer extends React.Component {
    componentDidMount()
    {
        authAPI.me().then(data => {
            if(data.resultCode === 0)
            {
                this.props.setUserData(data.data)
                profileAPI.profileInfo(data.data.userId).then(data => {
                    this.props.setUserPhoto(data.photo)
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