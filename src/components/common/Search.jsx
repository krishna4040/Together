import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { setFriend, removeFriend } from '../../store/slices/user'
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';

const Search = ({ setSearch }) => {

    const currentUser = useSelector(state => state.user);
    const { token } = useSelector(state => state.auth);
    const [userName, setUserName] = useState('');
    const [user, setUser] = useState({});
    const [suggestions, setSuggestions] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeSuggestions = async (key) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/all-users/suggestion?q=${key}`);
            setSuggestions(response.data.data);
        } catch (error) {
            toast.error("unable to fetch suggestions");
            console.log(error);
        }
    }

    const changeHandler = async (event) => {
        setUser({});
        setUserName(event.target.value);
        changeSuggestions(event.target.value);
    }

    const fetchUser = async (userName) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/all-users/search?userName=${userName}`);
            if (response.data.success) {
                setUser(response.data.data);
            }
        } catch (error) {
            toast.error("unable to fetch user from userName");
            console.log(error);
        }
    }
    const connectHandler = async (friend) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/friends/makeFriend`, {
                friendId: friend._id
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            toast.success("friend connected");
            dispatch(setFriend(friend));
        } catch (error) {
            console.log(error);
        }
    }
    const removeHandler = async (friend) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/friends/removeFriend`, {
                friendId: friend._id
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            toast.error("Friend removed");
            dispatch(removeFriend(friend._id));
        } catch (error) {
            console.log(error);
        }
    }
    const visitHandler = (userName) => {
        navigate(`/view-profile/${userName}`);
    }

    return (
        <div>
            <label className="fixed inset-0 z-50 flex items-center justify-center w-screen h-screen backdrop-blur-sm">
                <div className="flex flex-col w-full lg:w-[25%] gap-5 modal show pause-scroll">
                    <button className="absolute right-4 top-3" onClick={() => { setSearch(false) }}>✕</button>
                    <h2 className="text-xl">Search</h2>
                    <div className='flex items-center gap-1'>
                        <div className='is-divider' />
                        <input placeholder='Enter Username to search' value={userName} onChange={changeHandler} className='input success' />
                    </div>
                    {
                        user?.userName ?
                            <div className='flex flex-col items-center gap-5'>
                                <div className='flex flex-col items-center justify-center'>
                                    <div className='w-[50px] h-[50px] rounded-full overflow-hidden'>
                                        <img src={user.profileDetails.pfp} alt="user_image" className='w-full' />
                                    </div>
                                    <p className='min-w-[55px] text-lg capitalize'>{user.userName}</p>
                                </div>
                                <div className='flex items-center justify-center gap-5'>
                                    {
                                        currentUser.friends.find(friend => friend._id === user._id) ?
                                            <button className='btn outline danger' onClick={() => { removeHandler(user) }}>Remove</button> :
                                            <button className='btn outline success' onClick={() => { connectHandler(user) }}>Connect</button>
                                    }
                                    <button className='btn outline danger' onClick={() => { visitHandler(user.userName) }}>Visit</button>
                                </div>
                            </div>
                            :
                            <div className='flex flex-col items-start justify-start gap-3 p-2 overflow-x-hidden overflow-y-auto h-fit'>
                                {
                                    suggestions.slice(0, 4).map((suggestion, index) => {
                                        return <button key={index} className='w-full p-2 text-left transition-all duration-200 rounded-md bg-slate-200 hover:scale-105' onClick={() => { fetchUser(suggestion.userName) }}>{suggestion.userName}</button>
                                    })
                                }
                            </div>
                    }
                    <div className="flex gap-3">
                        <button className="flex-1 btn solid danger" onClick={() => { fetchUser(userName) }}>Search</button>
                    </div>
                </div>
            </label>
        </div>
    )
}

export default Search