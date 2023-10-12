import { configureStore } from '@reduxjs/toolkit'
import chatReducer from './slices/chat'

export const store = configureStore({
    reducer:{
        chat: chatReducer
    }
})