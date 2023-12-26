import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { CiSearch } from "react-icons/ci";
import { FaBell } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import UserListItem from './utils/UserListItems'
import { pushChat, setSelectedChat } from '../../../store/slices/chat'

const SideBar = () => {

    const [loadingChat, setLoadingChat] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const [userName, setUserName] = useState("");

    const dispacth = useDispatch();
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
            toast.error("unable fecth suggetions");
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
                dispacth(pushChat(data.data));
            }
            dispacth(setSelectedChat(data.data));
            setLoadingChat(false);
            toggleDrawer();
        } catch (error) {
            toast.error("unable to access chat");
            console.log(error);
        }
    }

    return (
        <div className='flex items-center justify-between w-full px-2 py-1 bg-white border-4'>
            <span className="tooltip bw bottom" data-tooltip="search users to chat">
                <button className="btn solid ghost" onClick={toggleDrawer}>
                    <CiSearch />
                    <div className='px-4 sm:hidden md:flex'>
                        Search User
                    </div>
                </button>
            </span>
            <div>
                Talk-A-Tive
            </div>
            <div>
                <div className="dropdown success">
                    <label className="btn solid"><FaBell className='m-1 text-2xl' /></label>
                    <div className="menu bottom">
                        <a className="text-sm item">Profile</a>
                        <a className="text-sm item">Account settings</a>
                        <a className="text-sm item">Subscriptions</a>
                    </div>
                </div>
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
        </div>
    )
}

export default SideBar