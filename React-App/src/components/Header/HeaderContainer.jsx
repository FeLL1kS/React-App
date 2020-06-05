import React from 'react'
import { connect } from 'react-redux';
import Header from './Header';
import { getAuthInfo, logout } from '../../redux/authReducer'

class HeaderContainer extends React.Component {

    onClickLogout = () => {
        this.props.logout()
    }

    render()
    {
        return <Header {...this.props} onClickLogout={this.onClickLogout} />
    }
}

let mapStateToProps = (state) => ({
    ...state.auth
})

let mapActionToProps = {
    getAuthInfo,
    logout
}

export default connect(mapStateToProps, mapActionToProps)(HeaderContainer);