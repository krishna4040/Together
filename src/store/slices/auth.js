import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
    name: 'user',
    initialState: {
        token: sessionStorage.getItem('token') ? sessionStorage.getItem('token') : null,
        signupData: {
            userName: null,
            email: null,
            password: null,
            gender: null
        }
    },
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
        },
        setSignupData: (state, action) => {
            state.signupData = action.payload;
        },
    }
});

export const { setToken, setSignupData } = authSlice.actions;
export default authSlice.reducer;