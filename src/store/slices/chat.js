import { createSlice } from '@reduxjs/toolkit'

const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        chats: [],
        selectedChat: null,
    },
    reducers: {
        setChats: (state, action) => {
            state.chats = action.payload;
        },
        pushChat: (state, action) => {
            state.chats.push(action.payload);
        },
        setSelectedChat: (state, action) => {
            state.selectedChat = action.payload;
        }
    }
});

export const { setChats, setSelectedChat, pushChat } = chatSlice.actions;
export default chatSlice.reducer;