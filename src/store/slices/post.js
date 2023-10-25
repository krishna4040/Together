import { createSlice } from '@reduxjs/toolkit'

const postSlice = createSlice({
    name: 'post',
    initialState: {
        title: null,
        image: null,
        caption: null,
    },
    reducers: {
        setTitle: (state,action) => {
            state.title = action.payload;
        },
        setCation: (state,action) => {
            state.caption = action.payload;
        },
        setImage: (state,action) => {
            state.image = action.payload;
        }
    }
});

export const { setTitle , setCation , setImage } = postSlice.actions;
export default postSlice.reducer;