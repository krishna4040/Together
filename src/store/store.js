import { configureStore } from '@reduxjs/toolkit'
import chatReducer from './slices/chat'
import userReducer from './slices/user'
import postReducer from './slices/post'
import authReducer from './slices/auth'

export const store = configureStore({
    reducer: {
        chat: chatReducer,
        user: userReducer,
        auth: authReducer,
        post: postReducer
    }
})