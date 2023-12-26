import React, { useState } from 'react'
import { FaEye } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedChat } from '../../../../store/slices/chat'
import UserBadgeItem from './UserBadgeItem'
import axios from 'axios';
import toast from 'react-hot-toast';
import UserListItems from './UserListItems';

const UpdatGroupChatModal = ({ fecthAgain, setFecthAgain }) => {

    const dispacth = useDispatch();

    const [isOpen, setIsOpen] = useState(false);
    const [groupChatName, setGroupChatName] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [userName, setUserName] = useState("");
    const { selectedChat } = useSelector(state => state.chat);
    const currentUser = useSelector(state => state.user);
    const { token } = useSelector(state => state.auth);

    const fecthSuggestions = async (q) => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/all-users/suggestion?q=${q}`);
            setSuggestions(data.data);
        } catch (error) {
            toast.error("unable tofecth suggestions");
            console.log(error);
        }
    }

    const handleGroupRename = async (e) => {
        e.preventDefault();
        if (!groupChatName) {
            toast.error("Please enter a valid chat name");
            return;
        }
        try {
            const { data } = await axios.put(`${import.meta.env.VITE_BASE_URL}/chat/renameGroup`, {
                chatId: selectedChat._id,
                chatName: groupChatName
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            dispacth(setSelectedChat(data.data));
            setGroupChatName('');
            setFecthAgain(!fecthAgain);
        } catch (error) {
            toast.error("unable to rename group");
            console.log(error);
        }
    }

    const handleRemoveFromGroup = async (user) => {
        if (selectedChat.groupAdmin._id !== currentUser._id) {
            toast.error("only group admin can remove from group");
            return;
        }

    }

    const handleAddToGroup = async (user) => {
        if (selectedChat.users.find(u => u._id === user._id)) {
            toast.error("user already in group");
            return;
        }
        if (selectedChat.groupAdmin !== currentUser._id) {
            toast.error("only group admin can add to group");
            return;
        }
        try {
            const { data } = await axios.put(`${import.meta.env.VITE_BASE_URL}/chat/addToGroup`, {
                chatId: selectedChat._id,
                userId: user._id
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        } catch (error) {
            toast.error("unable to add user to group");
            console.log(error);
        }
    }


    const changeHandler = (event) => {
        fecthSuggestions(event.target.value);
        setUserName(event.target.value);
    }

    return (
        <div>
            <label className="btn success solid" onClick={() => { setIsOpen(true) }}><FaEye /></label>
            <label className="modal-overlay" onClick={() => { setIsOpen(false) }}></label>
            <div className={`flex flex-col gap-5 modal ${isOpen ? 'show' : null}`}>
                <button className="absolute right-4 top-3" onClick={() => { setIsOpen(false) }}>✕</button>
                <h2 className="text-xl">{selectedChat.chatName}</h2>
                <div className='flex flex-col items-start justify-center'>
                    <div className='flex flex-wrap items-center justify-start gap-2'>
                        {
                            selectedChat.users.map(user => {
                                return <UserBadgeItem key={user._id} user={user} handleFunction={() => { handleRemoveFromGroup(user) }} />
                            })
                        }
                    </div>
                    <form className='flex items-center justify-start gap-2' onSubmit={handleGroupRename}>
                        <input type="text" placeholder='Chat Name' value={groupChatName} onChange={(e) => { setGroupChatName(e.target.value) }} className='input success lg' />
                        <button className='text-white bg-teal-700 btn'>Update</button>
                    </form>
                    <form onSubmit={handleAddToGroup} className='w-full'>
                        <input type="text" className='w-full input success lg' placeholder='Add User to Group' value={userName} onChange={changeHandler} />
                    </form>
                    <div className='w-full mt-3'>
                        {
                            suggestions.slice(0, 4).map(user => {
                                return <UserListItems key={user._id} user={user} handleFunction={() => { handleAddToGroup(user) }} />
                            })
                        }
                    </div>
                </div>
                <div>
                    <button className='float-right btn danger solid' onClick={() => { handleRemoveFromGroup(currentUser) }}>Leave Group</button>
                </div>
            </div>
        </div>
    )
}

export default UpdatGroupChatModal