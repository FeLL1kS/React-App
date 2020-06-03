import { createStore, combineReducers, applyMiddleware } from "redux";
import profileReducer from "./profileReducer";
import dialogsReducers from "./dialogsReducer";
import usersReducer from "./usersReducer";
import authReducer from "./authReducer";
import thunk from 'redux-thunk'
import { reducer as formReducer } from 'redux-form'

let reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducers, 
    usersPage: usersReducer, 
    auth: authReducer,
    form: formReducer
})

let store = createStore(reducers, applyMiddleware(thunk))

window.store = store

export default store