import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
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

export const { setToken } = userSlice.actions;
export default userSlice.reducer;