import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setChats, setSelectedChat } from '../../../store/slices/chat'
import toast from 'react-hot-toast';
import GroupChatModel from './utils/GroupChatModel'
import { FaUsers } from "react-icons/fa6";
import { useAxiosWithAuth } from '../../../utils/axiosInstance';

const MyChat = ({ fetchAgain }) => {
    const dispatch = useDispatch();
    const { selectedChat, chats } = useSelector(state => state.chat);
    const user = useSelector(state => state.user);
    const axiosPrivate = useAxiosWithAuth()

    const fetchChats = async () => {
        try {
            const { data } = await axiosPrivate.get('/chat/fetchChat')
            dispatch(setChats(data.data));
        } catch (error) {
            toast.error("unable to fetch chats");
            console.log(error);
        }
    }

    useEffect(() => {
        fetchChats();
    }, [fetchAgain]);

    const getSenderUserName = (users) => {
        return users[0]._id === user._id ? users[1].userName : users[0].userName;
    }

    const getSenderPfp = (users) => {
        return users[0]._id === user._id ? users[1].profileDetails.pfp : users[1].profileDetails.pfp;
    }

    return (
        <div className={`${selectedChat ? "hidden" : "flex"} lg:flex flex-col items-center p-3 bg-white w-full lg:w-[31%] rounded-lg border overflow-y-scroll`}>
            <div className='flex items-center justify-between w-full p-3'>
                <p className='text-2xl font-bold'>My Chats</p>
                <GroupChatModel />
            </div>
            <div className='flex flex-col p-3 bg-[#f8f8f8] w-full rounded-lg overflow-y-hidden gap-2'>
                {
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
                    })
                }
            </div>
        </div>
    )
}

export default MyChat