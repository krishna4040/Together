import {configureStore} from '@reduxjs/toolkit'
import chatReducer from './slices/chat'

export const store = configureStore({
    chat: chatReducer
})