import React from 'react'
import { sendMessage, getDialogs, setDialog } from '../../redux/dialogsReducer'
import Dialogs from './Dialogs'
import { connect } from 'react-redux'
import { withAuthRedirect } from '../../hoc/withAuthRedirect'
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'

class DialogsContainer extends React.Component {
    componentDidMount()
    {
        this.props.getDialogs(this.props.userId)
        this.props.setDialog(this.props.match.params.dialogId)
    }

    componentDidUpdate(prevProps)
    {
        if(this.props.match.params.dialogId !== prevProps.match.params.dialogId)
                this.props.setDialog(this.props.match.params.dialogId)
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
    getDialogs,
    setDialog
}

export default compose(
    withAuthRedirect,
    withRouter,
    connect(mapStateToProps, mapActionToProps)
)(DialogsContainer)
