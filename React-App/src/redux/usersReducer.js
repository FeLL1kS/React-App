
const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET-USERS'
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE'
const SET_TOTAL_PAGES = 'SET-TOTAL-PAGES'
const TOGGLE_IS_FETCHING = ' TOGGLE-IS-FETCHING'

let initialState = {
    users: [],
    pageSize: 5,
    totalPages: 1,
    currentPage: 1,
    isFetching: false
}

const usersReducer = (state = initialState, action) => {
    
    switch(action.type)
    {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map( u => u.id === action.id ? {...u, followed: true} : u )
            }
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map( u => u.id === action.id ? {...u, followed: false} : u )
            }
        case SET_USERS:
            return {
                ...state,
                users: [...action.users],
            }
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.newCurrentPage
            }
        case SET_TOTAL_PAGES:
            return {
                ...state,
                totalPages: action.totalPages
            }
        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            }
        default:
            return state
    }
}

export const follow = (id) => ({type: FOLLOW, id})
export const unfollow = (id) => ({type: UNFOLLOW, id})
export const setUsers = (users) => ({type: SET_USERS, users})
export const setCurrentPage = (newCurrentPage) => ({type: SET_CURRENT_PAGE, newCurrentPage})
export const setTotalPages = (totalPages) => ({type: SET_TOTAL_PAGES, totalPages})
export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching})

export default usersReducer