import { getAuthInfo } from "./authReducer";

const INITIALIZE = 'INITIALIZE'

let initialState = {
    initialized: false
}

const appReducer = (state = initialState, action) => {
    
    switch(action.type)
    {
        case INITIALIZE:
            return {
                ...state,
                initialized: true
            };
        default:
            return state
    }
}

const initialize = () => ({ type: INITIALIZE })

export const initializing = () => (dispatch) => {
    dispatch(getAuthInfo()).then(() => {
        dispatch(initialize())
    })
}

export default appReducer