
const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET-USERS'

let initialState = {
    users: []
}

const usersReducer = (state = initialState, action) => {
    
    switch(action.type)
    {
        case(FOLLOW):
            return {
                ...state,
                users: state.users.map( u => u.id === action.id ? {...u, followed: true} : u )
            }
        case(UNFOLLOW):
            return {
                ...state,
                users: state.users.map( u => u.id === action.id ? {...u, followed: false} : u )
            }
        case(SET_USERS):
            return {
                ...state,
                users: [...state.users, ...action.users]
            }
        default:
            return state
    }
}

export const followAC = (id) => ({type: FOLLOW, id})
export const unfollowAC = (id) => ({type: UNFOLLOW, id})
export const setUsersAC = (users) => ({type: SET_USERS, users})

export default usersReducer