import { createSlice } from '@reduxjs/toolkit'

const postSlice = createSlice({
    name: 'post',
    initialState: {
        title: null,
        displayImages: [],
        uploadImages: [],
        caption: null,
    },
    reducers: {
        setTitle: (state, action) => {
            state.title = action.payload;
        },
        setCation: (state, action) => {
            state.caption = action.payload;
        },
        setDisplayImages: (state, action) => {
            state.displayImages.push(action.payload);
        },
        setUploadImages: (state, action) => {
            state.uploadImages.push(action.payload);
        },
        resetAll: (state, action) => {
            state.title = null;
            state.displayImages = null;
            state.uploadImages = null;
            state.caption = null;
        }
    }
});

export const { setTitle, setCation, setDisplayImages, setUploadImages, resetAll } = postSlice.actions;
export default postSlice.reducer;