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
            pfp: null,
            visibility: null
        },
        requests: [],
        friends: [],
        posts: []
    },
    reducers: {
        setUser: (state, action) => {
            const { _id, userName, email, requests, profileDetails: { firstName, lastName, bday, age, gender, about, pfp }, friends, posts, chat } = action.payload;
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
            state.requests = requests;
        },
        addFriend: (state, action) => {
            state.friends.push(action.payload);
        },
        acceptFriendRequest: (state, action) => {
            state.requests = state.requests.filter(request => request._id !== action.payload._id);
            state.friends.push(action.payload);
        },
        rejectFriendRequest: (state, action) => {
            state.requests = state.requests.filter(request => request._id !== action.payload);
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
        updateProfile: (state, action) => {
            state.profileDetails = action.payload;
        }
    }
});

export const { setUser, removeFriend, addPost, addChat, removePost, acceptFriendRequest, rejectFriendRequest, addFriend, updateProfile } = userSlice.actions;
export default userSlice.reducer;