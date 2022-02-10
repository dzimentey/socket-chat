import {Dispatch} from "redux";
import {api} from "./api";

const initialState = {
    messages: []
}
type initialStateType = typeof initialState
type ActionsChatType = ReturnType<typeof messagesReceivedAC> | ReturnType<typeof newMessageReceivedAC>

export const chatReducer = (state: initialStateType = initialState, action: ActionsChatType) => {
    switch (action.type) {
        case 'Messages-Received':
            return {...state, messages: action.messages}
        case 'New-Message-Received':
            return {...state, messages: [...state.messages, action.message]}
        default:
            return state
    }
}

export const messagesReceivedAC = (messages: any) => ({type: 'Messages-Received', messages}) as const
export const newMessageReceivedAC = (message: any) => ({type: 'New-Message-Received', message}) as const

export const createConnectionTC = () => (dispatch: Dispatch) => {
    api.createConnection()
    api.subscribe(
        (messages: any) => {
        dispatch(messagesReceivedAC(messages))
    },
        (message: any) => {
        dispatch(newMessageReceivedAC(message))
    })
}

export const setClientNameTC = (name: string) => (dispatch: Dispatch) => {
    api.sendName(name)
}

export const sendMessageTC = (text: string) => (dispatch: Dispatch) => {
    api.sendTextMessage(text)
}

export const destroyConnectionTC = () => (dispatch: Dispatch) => {
    api.destroyConnection()
}