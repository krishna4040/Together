import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { pushChat, setSelectedChat } from '../../../../store/slices/chat'
import UserBadgeItem from './UserBadgeItem'
import UserListItems from './UserListItems';
import toast from 'react-hot-toast';
import axios from 'axios';

const GroupChatModel = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [userName, setUserName] = useState("");
    const [groupChatName, setGroupChatName] = useState();
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);

    const dispacth = useDispatch();
    const user = useSelector(state => state.user);
    const { chats } = useSelector(state => state.chat);
    const { token } = useSelector(state => state.auth);

    const fecthSuggestions = async (q) => {
        try {
            setLoading(true);
            const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/all-users/suggestion?q=${q}`);
            setSuggestions(data.data);
            setLoading(false);
        } catch (error) {
            toast.error("unable to fecth suggestion");
            console.log(error);
        }
    }
    const handleSumbit = async (event) => {
        event.preventDefault();
        try {
            if (!groupChatName || !selectedUsers) {
                toast.error("Both Inputs are requiered");
            }
            const users = selectedUsers.map(user => user._id);
            const { data } = await axios.post(`${import.meta.env.VITE_BASE_URL}/chat/createGroupChat`, {
                chatName: groupChatName,
                users
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            dispacth(pushChat(data.data));
            dispacth(setSelectedChat(data.data));
            setIsOpen(false);
            toast.success("group chat created");
        } catch (error) {
            toast.error("unable to create group chat");
            console.log(error);
        }
    }
    const handleAddToGroup = (userToAdd) => {
        if (selectedUsers.includes(userToAdd)) {
            toast.error("user already added");
            return;
        }
        setSelectedUsers([...selectedUsers, userToAdd]);
    }
    const handleDeleteFromGroup = (delUser) => {
        setSelectedUsers(selectedUsers.filter(sel => sel._id !== delUser._id))
    }
    const changeHandler = (event) => {
        setUserName(event.target.value);
        fecthSuggestions(event.target.value);
    }

    return (
        <div>
            <label className="btn success solid" onClick={() => { setIsOpen(true) }}>New Group Chat</label>
            <label className="modal-overlay" onClick={() => { setIsOpen(false) }}></label>
            <div className={`modal flex flex-col gap-5 pause-scroll ${isOpen ? 'show' : null}`}>
                <button className="absolute right-4 top-3" onClick={() => { setIsOpen(false) }}>✕</button>
                <h2 className="flex justify-center text-xl">Create Group Chat</h2>
                <div className='flex flex-col items-center gap-3'>
                    <form onSubmit={handleSumbit} className='flex flex-col items-start justify-center w-full gap-2'>
                        <input type="text" className='w-full input success lg' placeholder='Chat Name' value={groupChatName} onChange={(e) => { setGroupChatName(e.target.value) }} />
                        <input type="text" className='w-full input success lg' placeholder='Add Users eg: John, Brok, Jane' value={userName} onChange={changeHandler} />
                        <button className='self-end btn solid info'>Create Chat</button>
                    </form>
                    <div className='flex flex-wrap items-center justify-start gap-2'>
                        {
                            selectedUsers.map(user => {
                                return <UserBadgeItem key={user._id} user={user} handleFunction={() => { handleDeleteFromGroup(user) }} />
                            })
                        }
                    </div>
                    <div className='w-full'>
                        {
                            loading ?
                                <div>loading...</div> :
                                suggestions.slice(0, 4).map(user => <UserListItems key={user._id} user={user} handleFunction={() => { handleAddToGroup(user) }} />)
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GroupChatModel