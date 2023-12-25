import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setChats } from '../../../store/slices/chat'
import UserBadgeItem from './UserBadgeItem'
import UserListItems from './UserListItems';
import toast from 'react-hot-toast';
import axios from 'axios';

const GroupChatModel = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [groupChatName, setGroupChatName] = useState();
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const dispacth = useDispatch();
    const user = useSelector(state => state.user);
    const { chats } = useSelector(state => state.chat);
    const { token } = useSelector(state => state.auth);

    // const handleSearch = axios (q) => {
    //     setSearch(q);
    //     if (!q) {
    //         return;
    //     }
    //     try {
    //         setLoading(true);
    //         const {data} = await
    //     } catch (error) {

    //     }
    // }
    const handleSumbit = async () => {
        if (!groupChatName || !selectedUsers) {
            toast.error("Both Inputs are requiered");
        }
        const { data } = await axios.post(`${import.meta.env.VITE_BASE_URL}/chat/createGroupChat`, {
            name: groupChatName,
            users: JSON.stringify(selectedUsers.map(u => u._id))
        })
    }
    const handleGroup = (userToAdd) => {
        if (selectedUsers.includes(userToAdd)) {
            toast.error("user already added");
            return;
        }
        setSelectedUsers([...selectedUsers, userToAdd]);
    }
    const handleDelete = (delUser) => {
        setSelectedUsers(selectedUsers.filter(sel => sel._id !== delUser._id))
    }

    return (
        <div>
            <label className="btn success solid" onClick={() => { setIsOpen(true) }}>New Group Chat</label>
            <label className="modal-overlay" onClick={() => { setIsOpen(false) }}></label>
            <div className={`modal flex flex-col gap-5 pause-scroll ${isOpen ? 'show' : null}`}>
                <button className="absolute right-4 top-3" onClick={() => { setIsOpen(false) }}>✕</button>
                <h2 className="flex justify-center text-xl">Create Group Chat</h2>
                <div className='flex flex-col items-center'>
                    <form onSubmit={handleSumbit}>
                        <input type="text" className='input' placeholder='Chat Name' value={groupChatName} onChange={(e) => { setGroupChatName(e.target.value) }} />
                        <input type="text" className='input' placeholder='Chat Name' value={groupChatName} onChange={(e) => { setGroupChatName(e.target.value) }} />
                        <button>Create Chat</button>
                    </form>
                    {
                        selectedUsers.map(user => {
                            return <UserBadgeItem key={user._id} user={user} handleFunction={() => { handleDelete(user) }} />
                        })
                    }
                    {
                        loading ?
                            <div>loading...</div>
                            :
                            searchResults.slice(0, 4).map(user => <UserListItems key={user._id} user={user} handleFunction={() => { handleGroup() }} />)
                    }
                </div>
            </div>
        </div>
    )
}

export default GroupChatModel