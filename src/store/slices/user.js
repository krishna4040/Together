import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: 'user',
    initialState: {
        _id: null,
        userName: null,
        email: null,
        profileDetails: {
            firstName: null,
            lastName: null,
            dob: null,
            age: null,
            gender: null,
            about: null,
            pfp: null
        },
        friends: null,
        posts: null,
        chat: null
    },
    reducers: {
        setUser: (state, action) => {
            const { _id, userName, email, profileDetails: { firstName, lastName, bday, age, gender, about, pfp }, friends, posts, chat } = action.payload;
            state._id = _id;
            state.userName = userName;
            state.email = email;
            state.profileDetails.firstName = firstName;
            state.profileDetails.lastName = lastName;
            state.profileDetails.dob = bday;
            state.profileDetails.age = age;
            state.profileDetails.gender = gender;
            state.profileDetails.about = about;
            state.profileDetails.pfp = pfp;
            state.friends = friends;
            state.posts = posts;
            state.chat = chat;
        }
    }
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;