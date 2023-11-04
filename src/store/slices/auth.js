import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
    name: 'user',
    initialState: {
        token: sessionStorage.getItem('token') ? sessionStorage.getItem('token') : null,
    },
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
        },
    }
});

export const { setToken } = authSlice.actions;
export default authSlice.reducer;