import { usersAPI, followAPI } from "../api/api"

const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET-USERS'
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE'
const SET_TOTAL_PAGES = 'SET-TOTAL-PAGES'
const TOGGLE_IS_FETCHING = ' TOGGLE-IS-FETCHING'
const TOGGLE_IS_FOLLOWING_IN_PROGRESS = ' TOGGLE-IS-FOLLOWING-IN-PROGRESS'

let initialState = {
    users: [],
    pageSize: 5,
    totalPages: 1,
    currentPage: 1,
    isFetching: false,
    followingInProgress: []
}

const usersReducer = (state = initialState, action) => {
    
    switch(action.type)
    {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map( u => u.id === action.id ? {...u, followed: !u.followed} : u )
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
        case TOGGLE_IS_FOLLOWING_IN_PROGRESS:
            return {
                ...state,
                followingInProgress: action.followingInProgress 
                ? [...state.followingInProgress, action.userId] 
                : state.followingInProgress.filter(id => id !== action.userId)
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
export const toggleIsFollowingInProgress = (followingInProgress, userId) => ({type: TOGGLE_IS_FOLLOWING_IN_PROGRESS, followingInProgress, userId})

export const getUsers = (pageSize, currentPage) => async (dispatch) => {
    dispatch(setUsers([]))
    dispatch(toggleIsFetching(true))
    let data = await usersAPI.getUsers(pageSize, currentPage)
    dispatch(setCurrentPage(currentPage))
    dispatch(toggleIsFetching(false))
    dispatch(setUsers(data.users))
    dispatch(setTotalPages(data.totalPages))
}

export const following = (id, isFollow = true) => async (dispatch) => {
    dispatch(toggleIsFollowingInProgress(true, id))
    let data =  isFollow ? await followAPI.follow(id) : await followAPI.unfollow(id)
    if(data.resultCode === 0)
    {
        dispatch(follow(id))
    }
    dispatch(toggleIsFollowingInProgress(false, id))
}

export default usersReducer