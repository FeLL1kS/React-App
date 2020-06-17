import React from 'react'
import { sendMessage, getDialogs } from '../../redux/dialogsReducer'
import Dialogs from './Dialogs'
import { connect } from 'react-redux'
import { withAuthRedirect } from '../../hoc/withAuthRedirect'
import { compose } from 'redux'

class DialogsContainer extends React.Component {
    componentDidMount()
    {
        this.props.getDialogs(this.props.userId)
    }
    
    render()
    {
        return <Dialogs {...this.props}/>
    }
}

let mapStateToProps = (state) => ({
    dialogsPage: state.dialogsPage,
    userId: state.auth.userId
})

let mapActionToProps = {
    sendMessage,
    getDialogs
}

export default compose(
    withAuthRedirect,
    connect(mapStateToProps, mapActionToProps)
)(DialogsContainer)
