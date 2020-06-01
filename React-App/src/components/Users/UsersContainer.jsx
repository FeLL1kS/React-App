import React from 'react'
import { connect } from 'react-redux'
import { follow, unfollow, setUsers, setCurrentPage, setTotalPages, toggleIsFetching, toggleIsFollowingInProgress } from '../../redux/usersReducer'
import Users from './Users';
import { usersAPI } from '../../api/api';

class UsersContainer extends React.Component {
        
    componentDidMount() {
        this.props.toggleIsFetching(true)
        usersAPI.getUsers(this.props.pageSize, this.props.currentPage).then(data => {
            this.props.toggleIsFetching(false)
            this.props.setUsers(data.users)
            this.props.setTotalPages(data.totalPages)
        })
    }

    onPageChanged = (pageNumber) => {
        this.props.toggleIsFetching(true)
        this.props.setCurrentPage(pageNumber)
        usersAPI.getUsers(this.props.pageSize, pageNumber).then(data => {
                this.props.toggleIsFetching(false)
                this.props.setUsers(data.users, data.totalCount)
        })
    }
    
    render() 
    {
        return <>
            <Users   totalPages={this.props.totalPages} 
                            currentPage={this.props.currentPage} 
                            users={this.props.users} 
                            onPageChanged={this.onPageChanged}
                            follow={this.props.follow}
                            unfollow={this.props.unfollow}
                            isFetching={this.props.isFetching}
                            followingInProgress={this.props.followingInProgress}
                            toggleIsFollowingInProgress={this.props.toggleIsFollowingInProgress}
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
        followingInProgress: state.usersPage.followingInProgress
    }
}

let mapActionToProps = {
    follow,
    unfollow,
    setUsers, 
    setCurrentPage, 
    setTotalPages, 
    toggleIsFetching,
    toggleIsFollowingInProgress
}

export default connect(mapStateToProps, mapActionToProps)(UsersContainer)