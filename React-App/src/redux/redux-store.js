import { createStore, combineReducers } from "redux";
import profileReducer from "./profileReducer";
import dialogsReducers from "./dialogsReducer";
import usersReducer from "./usersReducer";
import authReducer from "./authReducer";


let reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducers, 
    usersPage: usersReducer, 
    auth: authReducer})

let store = createStore(reducers)

window.store = store

export default store