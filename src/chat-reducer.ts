import {Dispatch} from "redux";
import {api} from "./api";

const initialState: {messages: any[], typingUsers: any[]} = {
    messages: [],
    typingUsers: [],
}

type initialStateType = typeof initialState
type ActionsChatType = ReturnType<typeof messagesReceivedAC> | ReturnType<typeof newMessageReceivedAC>
                        | ReturnType<typeof typingUserAddedAC>


export const chatReducer = (state:initialStateType = initialState, action: ActionsChatType) => {
    switch (action.type) {
        case 'Messages-Received':
            return {...state, messages: action.messages}
        case 'New-Message-Received':
            return {...state,
                messages: [...state.messages, action.message],
                typingUsers: state.typingUsers.filter((u: any) => u.id !== action.message.user.id),
            }
        case "Typing-User-Added":
            return {...state, typingUsers: [...state.typingUsers.filter((u: any) => u.id !== action.user.id), action.user]}
        default:
            return state
    }
}

export const messagesReceivedAC = (messages: any) => ({type: 'Messages-Received', messages}) as const
export const newMessageReceivedAC = (message: any) => ({type: 'New-Message-Received', message}) as const
export const typingUserAddedAC = (user: any) => ({type: 'Typing-User-Added', user}) as const

export const createConnectionTC = () => (dispatch: Dispatch) => {
    api.createConnection()
    api.subscribe(
        (messages: any) => {
            dispatch(messagesReceivedAC(messages))
        },
        (message: string) => {
            dispatch(newMessageReceivedAC(message))
        },
        (user: any) => {
            dispatch(typingUserAddedAC(user))
        },
    )
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

export const typingMessageTC = () => (dispatch: Dispatch) => {
    api.typingMessage()
}