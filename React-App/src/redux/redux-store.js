import { createStore, combineReducers } from "redux";
import profileReducer from "./profileReducer";
import dialogsReducers from "./dialogsReducer";
import usersReducer from "./usersReducer";


let reducers = combineReducers({profilePage: profileReducer, dialogsPage: dialogsReducers, usersPage: usersReducer})

let store = createStore(reducers)

export default store