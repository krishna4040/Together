import { createSlice } from '@reduxjs/toolkit'

const postSlice = createSlice({
    name: 'post',
    initialState: {
        liked: [],
    },
    reducers: {
        likePost: (state, action) => {
            state.liked.push(action.payload);
        },
        unlikePost: (state, action) => {
            state.liked.filter(item => item.id !== action.payload)
        }
    }
});

export const { likePost, unlikePost } = postSlice.actions;
export default postSlice.reducer;