import {createSlice} from '@reduxjs/toolkit'

const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        chat: []
    },
    reducers:{
        saveChat: (state,action) => {
            state.chat.push(action.payload);
        },
        removeChat: (state,action) => {
            return state.chat.filter(ele => ele.id !== action.payload);
        }
    }
});

export const {saveChat,removeChat} = chatSlice.actions;
export default chatSlice.reducer;