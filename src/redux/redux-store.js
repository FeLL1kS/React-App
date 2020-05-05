import { createStore, combineReducers } from "redux";
import profileReducer from "./profileReducer";
import dialogsReducers from "./dialogsReducer";

let reducers = combineReducers({profilePage: profileReducer, dialogsPage: dialogsReducers})

let store = createStore(reducers)

export default store