import Users from './Users'
import { connect } from 'react-redux'
import { followAC, unfollowAC, setUsersAC, setCurrentPageAC, setTotalPagesAC } from '../../redux/usersReducer'

let mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalPages: state.usersPage.totalPages,
        currentPage: state.usersPage.currentPage
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        follow: (id) => {
            dispatch(followAC(id))
        },
        unfollow: (id) => {
            dispatch(unfollowAC(id))
        },
        setUsers: (users) => {
            dispatch(setUsersAC(users))
        },
        setCurrentPage: (newCurrentPage) => {
            dispatch(setCurrentPageAC(newCurrentPage))
        },
        setTotalPages: (totalPages) => {
            dispatch(setTotalPagesAC(totalPages))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users)