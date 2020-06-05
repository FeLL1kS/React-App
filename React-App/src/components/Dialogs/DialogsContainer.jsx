import { sendMessage } from '../../redux/dialogsReducer'
import Dialogs from './Dialogs'
import { connect } from 'react-redux'
import { withAuthRedirect } from '../../hoc/withAuthRedirect'
import { compose } from 'redux'

let mapStateToProps = (state) => {
    return {
        dialogsPage: state.dialogsPage
    }
}

let mapActionToProps = {
    sendMessage
}

export default compose(
    withAuthRedirect,
    connect(mapStateToProps, mapActionToProps)
)(Dialogs)
