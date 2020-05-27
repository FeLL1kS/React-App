import React from 'react'
import UsersItem from './UsersItem/UsersItem'
import classes from './Users.module.css';
import Preloader from '../common/preloader/Preloader';

let Users = (props) => {
        
    let pages = [];
    for (let i = 1; i <= props.totalPages; i++)
    {
        pages.push(i);
    }
    return(
        <div>
            <div className={classes.point}>
                {pages.map(p => (<span onClick={() => props.onPageChanged(p)} className={props.currentPage === p && classes.selectedPage}>{p}</span>))}
            </div>
            {props.isFetching ? <Preloader /> : null}
            { props.users.map(u => (<UsersItem isFetching={props.isFetching} key={u.id}  user={u} follow={props.follow} unfollow={props.unfollow}/>)) }
        </div>
    )
}

export default Users