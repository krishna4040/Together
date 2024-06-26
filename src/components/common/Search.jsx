import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { removeFriend } from '../../store/slices/user'
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import * as _ from 'lodash'
import { ErrorButton, InfoButton, SuccessButton } from '../ui/Button';
import { Modal } from '../ui/Modal';
import { Avatar } from '../ui/Avatar';
import { useAxiosWithAuth } from '../../utils/axiosInstance';

const Search = ({ setSearch }) => {
    const currentUser = useSelector(state => state.user);
    const { token } = useSelector(state => state.auth);
    const [userName, setUserName] = useState('');
    const [user, setUser] = useState({});
    const [suggestions, setSuggestions] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const axiosPrivate = useAxiosWithAuth()

    const fetchSuggestions = async (key) => {
        try {
            const { data } = await axiosPrivate.get(`/all-users/suggestion?q=${key}`);
            setSuggestions(data.data);
        } catch (error) {
            toast.error("unable to fetch suggestions");
            console.log(error);
        }
    };

    const debouncedFetch = _.debounce(fetchSuggestions, 500);

    useEffect(() => {
        if (userName) {
            debouncedFetch(userName);
        }
        return () => {
            debouncedFetch.cancel();
        };
    }, [userName, debouncedFetch]);

    const fetchUser = async (userName) => {
        try {
            const { data } = await axiosPrivate.get(`/all-users/search?userName=${userName}`);
            if (data.success) {
                setUser(data.data);
            }
        } catch (error) {
            toast.error("unable to fetch user from userName");
            console.log(error);
        }
    }

    const connectHandler = async (friend) => {
        try {
            if (friend.profileDetails.visibility === 'public') {
                const { data } = await axiosPrivate.post(`/friends/followFriend`, { friendId: friend._id });
                if (!data.success) {
                    throw new Error(response.data.message);
                }
                fetchUser(userName)
                toast.success("friend followed!");
            } else {
                const { data } = await axiosPrivate.post(`/friends/sendFriendRequest`, { friendId: friend._id });
                if (!data.success) {
                    throw new Error(response.data.message);
                }
                fetchUser(userName)
                toast.success("friend request sent!");
            }
        } catch (error) {
            console.log(error);
        }
    }

    const withDrawHandler = async (friend) => {
        try {
            const { data } = await axiosPrivate.put('/friends/withdrawFriendRequest', { friendId: friend._id })
            if (!data.success) {
                throw new Error(response.data.message);
            }
            fetchUser(userName)
            toast.error("Request withdrawn!!")
        } catch (error) {
            console.log(error)
        }
    }

    const removeHandler = async (friend) => {
        try {
            const { data } = await axiosPrivate.post('/friends/removeFriend', { friendId: friend._id });
            if (!data.success) {
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
        <Modal>
            <button className="absolute right-4 top-3" onClick={() => { setSearch(false) }}>✕</button>
            <h2 className="text-xl">Search</h2>
            <div className='flex items-center gap-1'>
                <div className='is-divider' />
                <input placeholder='Enter Username to search' value={userName} onChange={e => setUserName(e.target.value)} className='input success' />
            </div>
            {
                user?.userName ?
                    <div className='flex flex-col items-center gap-5'>
                        <div className='flex flex-col items-center justify-center'>
                            <Avatar src={user.profileDetails.pfp} h={80} w={80} />
                            <p className='min-w-[55px] text-lg capitalize'>{user.userName}</p>
                        </div>
                        <div className='flex items-center justify-center gap-5'>
                            {
                                currentUser.friends.find(friend => friend._id === user._id) ?
                                    <ErrorButton text="Remove" onClick={() => removeHandler(user)} /> :
                                    user.requests.find(req => req._id === currentUser._id) ?
                                        <InfoButton text="Requested" onClick={() => withDrawHandler(user)} /> :
                                        <SuccessButton onClick={() => connectHandler(user)} text={user.profileDetails.visibility === 'public' ? "Follow" : "Request"} />
                            }
                            <ErrorButton onClick={() => visitHandler(user.userName)} text="Visit" />
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
        </Modal>
    )
}

export default Search