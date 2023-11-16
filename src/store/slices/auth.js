import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
    name: 'user',
    initialState: {
        token: sessionStorage.getItem('token') ? sessionStorage.getItem('token') : null,
        signupData: {
            email: null,
            password: null,
        },
        userId: null
    },
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
        },
        setSignupData: (state, action) => {
            state.signupData = action.payload;
        },
        setUserId: (state, action) => {
            state.userId = action.payload;
        }
    }
});

export const { setToken, setSignupData, setUserId } = authSlice.actions;
export default authSlice.reducer;