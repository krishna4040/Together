import { configureStore } from '@reduxjs/toolkit'
import chatReducer from './slices/chat'
import userReducer from './slices/user'

export const store = configureStore({
    reducer:{
        chat: chatReducer,
        user: userReducer
    }
})