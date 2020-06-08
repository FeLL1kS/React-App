import React from 'react'
import UsersItem from './UsersItem/UsersItem'
import classes from './Users.module.css';
import Preloader from '../common/preloader/Preloader';
import Pagination from '../common/Pagination/Pagination';

let Users = (props) => {
        
    return(
        <div>
            <div className={classes.pagination}>
                <Pagination onPageChanged={props.onPageChanged} totalItems={props.totalPages} currentPage={props.currentPage}/>
            </div>
            {props.isFetching ? <Preloader /> : null}
            { props.users.map(u => (<UsersItem  isFetching={props.isFetching} 
                                                key={u.id}  
                                                user={u} 
                                                following={props.following} 
                                                followingInProgress={props.followingInProgress}
                                                currentUserId={props.currentUserId}/>)) }
        </div>
    )
}

export default Users