import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { CiSearch } from "react-icons/ci";
import { useDispatch, useSelector } from 'react-redux';
import UserListItem from './utils/UserListItems'
import { pushChat, setSelectedChat } from '../../../store/slices/chat'

const SideBar = () => {

    const [loadingChat, setLoadingChat] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const [userName, setUserName] = useState("");

    const dispatch = useDispatch();
    const { chats } = useSelector(state => state.chat);
    const { token } = useSelector(state => state.auth);

    const toggleDrawer = () => {
        setIsDrawerOpen(prev => !prev);
    }

    const changeSuggestions = async (key) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/all-users/suggestion?q=${key}`);
            setSuggestions(response.data.data);
        } catch (error) {
            toast.error("unable fetch suggetions");
        }
    }

    const changeHandler = (event) => {
        changeSuggestions(event.target.value);
        setUserName(event.target.value);
    }

    const accessChat = async (userId) => {
        try {
            setLoadingChat(true);
            const { data } = await axios.post(`${import.meta.env.VITE_BASE_URL}/chat/createChat`, {
                userId: userId
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });
            if (!chats.find((c) => c._id === data.data._id)) {
                dispatch(pushChat(data.data));
            }
            dispatch(setSelectedChat(data.data));
            setLoadingChat(false);
            toggleDrawer();
        } catch (error) {
            toast.error("unable to access chat");
            console.log(error);
        }
    }

    return (
        <div className='flex items-center justify-between p-2 bg-black w-[calc(100vw-200px)]'>
            <span className="tooltip bw bottom" data-tooltip="search users to chat">
                <button className="text-white solid bw btn" onClick={toggleDrawer}>
                    <CiSearch />
                    <div className='px-4 sm:hidden md:flex'>
                        Search User
                    </div>
                </button>
            </span>
            <h2 className='text-xl font-bold text-white'>
                Talk-Together
            </h2>
            <div>
                <label className="drawer-overlay" onClick={toggleDrawer}></label>
                <div className={`drawer right ${isDrawerOpen ? 'show' : null}`}>
                    <div className="flex flex-col h-full content">
                        <button className="absolute btn sm circle ghost right-2 top-2" onClick={toggleDrawer}>✕</button>
                        <h2 className="m-3 text-xl">Search Users</h2>
                        <hr />
                        <div className='flex items-center justify-start m-3'>
                            <input className='mr-2 input success' placeholder='search by name or email' value={userName} onChange={changeHandler} />
                            <button className='btn solid bw'>Go</button>
                        </div>
                        {
                            suggestions.map(user => {
                                return <UserListItem key={user._id} user={user} handleFunction={() => { accessChat(user._id) }} />
                            })
                        }
                    </div>
                    {loadingChat && <div className='spinner'></div>}
                </div>
            </div>
        </div>
    )
}

export default SideBar