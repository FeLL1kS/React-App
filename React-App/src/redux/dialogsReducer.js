import { dialogsAPI, usersAPI } from '../api/api'

const SEND_MESSAGE = 'SEND-MESSAGE'
const GET_DIALOGS = 'GET-DIALOGS'
const SET_DIALOG_ID = 'SET-DIALOG-ID'
const FILL_MESSAGES_DATA = 'FILL-MESSAGES-DATA'
const ADD_NEW_DIALOG = 'ADD-NEW-DIALOG'

let initialState = {
    dialogsData: [],
    currentDialogId: null,
    messagesData: []
}

const dialogsReducers = (state = initialState, action) => {
    
    switch(action.type)
    {
        case SEND_MESSAGE:
            return {
                ...state,
                messagesData: [...state.messagesData, action.payload],
            }
        case GET_DIALOGS:
            return {
                ...state,
                dialogsData: action.dialogsData
            }
        case SET_DIALOG_ID:
            return {
                ...state,
                currentDialogId: action.dialogId
            }
        case FILL_MESSAGES_DATA:
            return {
                ...state,
                messagesData: action.messagesData
            }
        case ADD_NEW_DIALOG:
            return {
                ...state,
                dialogsData: [...state.dialogsData, action.payload]
            }
        default:
            return state
    }
}

const successSendMessage = (payload) => ({ type: SEND_MESSAGE, payload })
const getUserDialogs = (dialogsData) => ({ type: GET_DIALOGS, dialogsData })
const setCurrentDialogId = (dialogId) => ({ type: SET_DIALOG_ID, dialogId })
const fillMessagesData = (messagesData) => ({ type: FILL_MESSAGES_DATA, messagesData })
const addNewDialog = (payload) => ({ type: ADD_NEW_DIALOG, payload })

export const getDialogs = (userId) => async (dispatch) => {
    let data = await dialogsAPI.getDialogs(userId)
    
    if(data.resultCode === 0)
    {
        dispatch(getUserDialogs(data.data))
    }
}

export const setDialog = (dialogId) => async (dispatch, getState) => {
    if(dialogId === undefined)
    {
        dispatch(setCurrentDialogId(null))
        return
    }
    
    let data = await dialogsAPI.getMessages(dialogId)

    if(data.resultCode === 0)
    {
        dispatch(setCurrentDialogId(dialogId))
        dispatch(fillMessagesData(data.data))
    }
    if(data.resultCode === 1)
    {
        dispatch(setCurrentDialogId(dialogId))
        dispatch(fillMessagesData([]))
        let userData = await usersAPI.getUser(dialogId)
        
        if(getState().dialogsPage.dialogsData.filter(d => parseInt(d.id) === parseInt(dialogId)).length === 0)
            dispatch(addNewDialog({
                id: userData.id,
                name: userData.name,
                avatar: userData.photo
            }))
    }
}

export const sendMessage = (dialogId, message) => async (dispatch, getState) => {
    let data = await dialogsAPI.newMessage(dialogId, getState().auth.userId, message)
    if(data.resultCode === 0)
    {
        dispatch(successSendMessage({
            id: getState().auth.userId,
            message: message,
            from: 'im',
            name: getState().auth.name,
            avatar: getState().auth.photo
        }))
    }
    if(data.resultCode === 10)
    {
        dialogsAPI.createNewDialog(getState().auth.userId, dialogId)
        dispatch(sendMessage(dialogId, message))
    }
}

export default dialogsReducers