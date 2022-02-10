import {applyMiddleware, combineReducers, createStore} from "redux";
import {chatReducer} from "./chat-reducer";
import thunk from "redux-thunk";

// unite reducer using rootReducer
const rootReducer = combineReducers({
    chat: chatReducer,
})

// The store creating
export const store = createStore(rootReducer, applyMiddleware(thunk));

// Typification of the store
export type RootStateType = ReturnType<typeof rootReducer>