import React from 'react'
// import avatar from '../../img/avatar.jpg'
// import classes from './Users.module.css'
import UsersItem from './UsersItem/UsersItem'
import * as axios from 'axios'
import classes from './Users.module.css';

class Users extends React.Component {
        
    componentDidMount() {
        axios.get("http://localhost:2669/api/users?pageSize=" + this.props.pageSize + "&pageNumber=" + this.props.currentPage)
        .then(response => {
            this.props.setUsers(response.data.users)
            this.props.setTotalPages(response.data.totalPages)
        })
    }

    getUsers = () => 
    {
        if(this.props.users.length === 0)
        {
            axios.get("http://localhost:2669/api/users")
                .then(response => {
                    this.props.setUsers(response.data)
                })
        }
    }

    onPageChanged = (pageNumber) => {
        this.props.setCurrentPage(pageNumber)
        axios.get("http://localhost:2669/api/users?pageSize=" + this.props.pageSize + "&pageNumber=" + pageNumber)
            .then(response => {
                this.props.setUsers(response.data.users, response.data.totalCount)
        })
    }
    
    render() 
    {
        let pages = [];
        for (let i = 1; i <= this.props.totalPages; i++)
        {
            pages.push(i);
        }
        return(
            <div>
                <div>
                    {pages.map(p => (<span onClick={() => this.onPageChanged(p)} className={this.props.currentPage === p && classes.selectedPage}>{p}</span>))}
                </div>
                {/* <button onClick={this.getUsers}>Get Users</button> */}
                { this.props.users.map(u => (<UsersItem key={u.id}  user={u} follow={this.props.follow} unfollow={this.props.unfollow}/>)) }
            </div>
        )
    }
}

export default Users