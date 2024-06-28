import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setChats, setSelectedChat, pushChat } from '../../../store/slices/chat'
import toast from 'react-hot-toast';
import GroupChatModel from './utils/GroupChatModel'
import { FaUsers } from "react-icons/fa6";
import { useAxiosWithAuth } from '../../../hooks/useAxios';

const MyChat = ({ fetchAgain }) => {
    const dispatch = useDispatch();
    const { selectedChat, chats } = useSelector(state => state.chat);
    const user = useSelector(state => state.user);
    const [newFriends, setNewFriends] = useState([]);
    const axiosPrivate = useAxiosWithAuth()
    const [loadingChat, setLoadingChat] = useState(false)

    const accessChat = async (userId) => {
        try {
            setLoadingChat(true);
            const { data } = await axiosPrivate.post(`/chat/createChat`, { userId });
            if (!chats.find((c) => c._id === data.data._id)) {
                dispatch(pushChat(data.data));
            }
            dispatch(setSelectedChat(data.data));
            setNewFriends(prev => {
                const updatedList = prev.filter(friend => friend._id !== userId);
                return updatedList;
            })
            setLoadingChat(false);
        } catch (error) {
            toast.error("unable to access chat");
            console.log(error);
        }
    }

    const fetchChats = async () => {
        try {
            const { data } = await axiosPrivate.get('/chat/fetchChat')
            dispatch(setChats(data.data.chats));
            setNewFriends(data.data.newFriends);
        } catch (error) {
            toast.error("unable to fetch chats");
            console.log(error);
        }
    }

    useEffect(() => {
        fetchChats();
    }, [fetchAgain]);

    const getSenderUserName = (users) => {
        if (!users || users.length < 2) {
            return ''
        }
        return users[0]._id === user._id ? users[1].userName : users[0].userName;
    }

    const getSenderPfp = (users) => {
        if (!users || users.length < 2) {
            return ''
        }
        return users[0]._id === user._id ? users[1].profileDetails.pfp : users[1].profileDetails.pfp;
    }

    return (
        <div className={`${selectedChat ? "hidden" : "flex"} lg:flex flex-col items-center p-3 bg-white w-full lg:w-[31%] rounded-lg border overflow-y-scroll`}>
            <div className='flex items-center justify-between w-full p-3'>
                <p className='text-2xl font-bold'>My Chats</p>
                <GroupChatModel />
            </div>
            <div className='flex flex-col p-3 bg-[#f8f8f8] w-full rounded-lg gap-2'>
                {
                    chats.length ?
                    chats.map(chat => {
                        return (
                            <div key={chat._id} onClick={() => { dispatch(setSelectedChat(chat)) }} className={`cursor-pointer ${selectedChat === chat ? 'bg-[#38b2ac] text-white' : 'bg-[#e8e8e8] text-black'} px-3 py-2 rounded-lg`}>
                                {
                                    chat.isGroupChat ?
                                        <div className='flex items-center justify-start gap-4 p-2'>
                                            <div className='border border-black rounded-full avatar'><FaUsers /></div>
                                            <p>{chat.chatName}</p>
                                        </div> :
                                        <div className='flex items-center justify-start gap-4 p-2'>
                                            <div className='avatar'><img src={getSenderPfp(chat.users)} alt="avatar" /></div>
                                            <p>{getSenderUserName(chat.users)}</p>
                                        </div>
                                }
                            </div>
                        )
                    }) :
                    <></>
                }
            </div>
            <hr />
            <div className='flex items-center justify-between w-full p-3'>
                <p className='text-2xl font-bold'>New Friends</p>
            </div>
            <div className='flex flex-col p-3 bg-[#f8f8f8] w-full rounded-lg gap-2'>
                {
                    newFriends.length ?
                    newFriends.map(friend => {
                        return (
                            <div key={friend._id} onClick={() => accessChat(friend._id)} className={`cursor-pointer bg-[#e8e8e8] text-black px-3 py-2 rounded-lg`}>
                                <div className='flex items-center justify-start gap-4 p-2'>
                                    <div className='avatar'><img src={friend?.profileDetails?.pfp || ""} alt="avatar" /></div>
                                    <p>{friend.userName}</p>
                                </div>
                            </div>
                        )
                    }) :
                    <></>
                }
            </div>
            {loadingChat && <div className='spinner'></div>}
        </div>
    )
}

export default MyChat