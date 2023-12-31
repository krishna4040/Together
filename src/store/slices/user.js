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
        friends: [],
        posts: []
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
        },
        setFriend: (state, action) => {
            state.friends.push(action.payload);
        },
        removeFriend: (state, action) => {
            return {
                ...state,
                friends: state.friends.filter(friend => friend._id !== action.payload)
            };
        },
        addPost: (state, action) => {
            state.posts.push(action.payload);
        },
        removePost: (state, action) => {
            return {
                ...state,
                posts: state.posts.filter(post => post._id !== action.payload)
            };
        },
        addChat: (state, action) => {
            state.chat.push(action.payload);
        },
        setAbout: (state, action) => {
            state.profileDetails.about = action.payload;
        },
        setPfp: (state, action) => {
            state.profileDetails.pfp = action.payload;
        }
    }
});

export const { setUser, setFriend, removeFriend, addPost, addChat, removePost } = userSlice.actions;
export default userSlice.reducer;