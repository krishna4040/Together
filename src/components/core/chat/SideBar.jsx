import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { CiSearch } from "react-icons/ci";
import { FaBell } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import ChatLoading from './ChatLoading'
import UserListItem from './UserListItems'
import { setChats, setSelectedChat } from '../../../store/slices/chat'

const SideBar = () => {

    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingChat, setLoadingChat] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const dispacth = useDispatch();
    const user = useSelector(state => state.user);
    const chat = useSelector(state => state.chat);
    const { token } = useSelector(state => state.auth);

    const toggleDrawer = () => {
        setIsDrawerOpen(prev => !prev);
    }

    const accessChat = async (userId) => {
        try {
            setLoadingChat(true);
            const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/chat/accessChat`, {
                userId
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });
            if (!chat.find((c) => c._id === res.data.data._id)) {
                dispacth(setChats([res.data.data, ...chat]));
            }
            dispacth(setSelectedChat(res.data.data));
            setLoadingChat(false);
            toggleDrawer();
        } catch (error) {
            toast.error("unable to access chat");
        }
    }

    const handleSearch = async () => {
        if (!search) {
            toast.error("Please Enter something in search bar");
        }
        try {
            setLoading(true);
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/all-users/search?userName=${search}`);
            setSearchResult(res.data.data);
            setLoading(false);
        } catch (error) {
            toast.error("unable to make an api call");
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
            <div className=''>
                Talk-A-Tive
            </div>
            <div>
                <div className="dropdown success">
                    <label className="btn solid" tabindex="0"><FaBell className='m-1 text-2xl' /></label>
                    <div className="menu bottom">
                        <a className="text-sm item">Profile</a>
                        <a className="text-sm item" tabindex="-1">Account settings</a>
                        <a className="text-sm item" tabindex="-1">Subscriptions</a>
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
                                <input className='mr-2 input success' placeholder='search by name or email' value={search} onChange={(e) => { setSearch(e.target.value) }} />
                                <button className='btn solid bw' onClick={handleSearch}>Go</button>
                            </div>
                            {
                                loading ?
                                    <ChatLoading />
                                    :
                                    searchResult?.map(user => {
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