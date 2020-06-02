import React from 'react'
import { connect } from 'react-redux';
import Header from './Header';
import { getAuthInfo } from '../../redux/authReducer'

class HeaderContainer extends React.Component {
    
    componentDidMount()
    {
        this.props.getAuthInfo()
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
    getAuthInfo
}

export default connect(mapStateToProps, mapActionToProps)(HeaderContainer);