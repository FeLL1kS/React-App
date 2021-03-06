import React from 'react'
import { connect } from 'react-redux'
import { following, setCurrentPage, toggleIsFollowingInProgress, getUsers } from '../../redux/usersReducer'
import Users from './Users';
// import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';

class UsersContainer extends React.Component {
        
    componentDidMount() {
        this.props.getUsers(this.props.pageSize, this.props.currentPage)
    }

    onPageChanged = (pageNumber) => {
        this.props.getUsers(this.props.pageSize, pageNumber)
    }
    
    render() 
    {
        
        return <>
            <Users  totalPages={this.props.totalPages} 
                    currentPage={this.props.currentPage} 
                    users={this.props.users} 
                    onPageChanged={this.onPageChanged}
                    following={this.props.following}
                    isFetching={this.props.isFetching}
                    followingInProgress={this.props.followingInProgress}
                    currentUserId={this.props.currentUserId}
            />   
        </>
    }
}

let mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalPages: state.usersPage.totalPages,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress,
        currentUserId: state.auth.userId
    }
}

let mapActionToProps = {
    setCurrentPage, 
    toggleIsFollowingInProgress,
    getUsers,
    following
}

export default compose(
    // withAuthRedirect,
    connect(mapStateToProps, mapActionToProps)
)(UsersContainer)