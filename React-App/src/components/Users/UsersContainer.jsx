import React from 'react'
import { connect } from 'react-redux'
import { follow, unfollow, setUsers, setCurrentPage, setTotalPages, toggleIsFetching } from '../../redux/usersReducer'
import * as axios from 'axios'
import Users from './Users';

class UsersContainer extends React.Component {
        
    componentDidMount() {
        this.props.toggleIsFetching(true)
        axios.get("http://localhost:2669/api/users?pageSize=" + this.props.pageSize + "&pageNumber=" + this.props.currentPage, { withCredentials: true })
        .then(response => {
            console.log(response.data)
            this.props.toggleIsFetching(false)
            this.props.setUsers(response.data.users)
            this.props.setTotalPages(response.data.totalPages)
        })
    }

    onPageChanged = (pageNumber) => {
        this.props.toggleIsFetching(true)
        this.props.setCurrentPage(pageNumber)
        axios.get("http://localhost:2669/api/users?pageSize=" + this.props.pageSize + "&pageNumber=" + pageNumber, { withCredentials: true })
            .then(response => {
                this.props.toggleIsFetching(false)
                this.props.setUsers(response.data.users, response.data.totalCount)
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
        isFetching: state.usersPage.isFetching
    }
}

let mapActionToProps = {
    follow,
    unfollow,
    setUsers, 
    setCurrentPage, 
    setTotalPages, 
    toggleIsFetching
}

export default connect(mapStateToProps, mapActionToProps)(UsersContainer)