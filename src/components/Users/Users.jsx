import React from 'react'
import avatar from '../../img/avatar.jpg'
// import classes from './Users.module.css'
import UsersItem from './UsersItem/UsersItem'

const Users = (props) => {

    if(props.users.length === 0)
    {
        props.setUsers([
            {id: 1, avatar: { avatar }, followed: false, fullName: 'Oleg V.', status: 'Hello there', location: {city: 'Saint Petersburg', country: 'Russia'}},
            {id: 2, avatar: { avatar }, followed: true, fullName: 'Dima V.', status: 'Hello there', location: {city: 'Moscow', country: 'Russia'}},
            {id: 3, avatar: { avatar }, followed: true, fullName: 'Mariya V.', status: 'Hello there', location: {city: 'Ivanovo', country: 'Russia'}},
            {id: 4, avatar: { avatar }, followed: true, fullName: 'Valentin V.', status: 'Hello there', location: {city: 'Ivanovo', country: 'Russia'}},
        ])
    }

    return (
        <div>
            { props.users.map(u => (<UsersItem key={u.id}  user={u} follow={props.follow} unfollow={props.unfollow}/>)) }
        </div>
    )
}

export default Users