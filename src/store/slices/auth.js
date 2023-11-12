import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
    name: 'user',
    initialState: {
        token: sessionStorage.getItem('token') ? sessionStorage.getItem('token') : null,
        signupData: []
    },
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
        },
        setSignupData: (state, action) => {
            state.signupData.push(action.payload);
        }
    }
});

export const { setToken, setSignupData } = authSlice.actions;
export default authSlice.reducer;