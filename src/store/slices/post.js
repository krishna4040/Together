import { createSlice } from '@reduxjs/toolkit'

const postSlice = createSlice({
    name: 'post',
    initialState: {
        title: null,
        image: {
            displayImage: null,
            uploadImage: null
        },
        caption: null,
    },
    reducers: {
        setTitle: (state, action) => {
            state.title = action.payload;
        },
        setCation: (state, action) => {
            state.caption = action.payload;
        },
        setDisplayImage: (state, action) => {
            state.image.displayImage = action.payload;
        },
        setUploadImage: (state, action) => {
            state.image.uploadImage = action.payload;
        },
        resetAll: (state, action) => {
            state.title = null;
            state.image = null;
            state.caption = null;
        }
    }
});

export const { setTitle, setCation, setDisplayImage, setUploadImage, resetAll } = postSlice.actions;
export default postSlice.reducer;