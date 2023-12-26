import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setChats, setSelectedChat } from '../../../store/slices/chat'
import toast from 'react-hot-toast';
import GroupChatModel from './GroupChatModel'

const MyChat = ({ fecthAgain }) => {

    const dispacth = useDispatch();
    const { token } = useSelector(state => state.auth);
    const { selectedChat, chats } = useSelector(state => state.chat);
    const user = useSelector(state => state.user);

    const fecthChats = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/chat/fetchChat`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            dispacth(setChats(data.data));
        } catch (error) {
            toast.error("unable to fecth chats");
            console.log(error);
        }
    }

    useEffect(() => {
        fecthChats();
    }, [fecthAgain]);

    const getSenderUserName = (users) => {
        return users[0]._id === user._id ? users[1].userName : users[0].userName;
    }

    const getSenderPfp = (users) => {
        return users[0]._id === user._id ? users[1].profileDetails.pfp : users[1].profileDetails.pfp;
    }

    return (
        <div className={`${selectedChat ? "hidden" : "flex"} md:flex lg:flex flex-col items-center p-3 bg-white w-full md:w-[31%] rounded-lg border`}>
            <div className='flex items-center justify-between w-full p-3'>
                My Chats
                <GroupChatModel />
            </div>
            <div className='flex flex-col p-3 bg-[#f8f8f8] w-full rounded-lg overflow-y-hidden gap-2'>
                {
                    chats.map(chat => {
                        return (
                            <div key={chat._id} onClick={() => { dispacth(setSelectedChat(chat)) }} className={`cursor-pointer ${selectedChat === chat ? 'bg-[#38b2ac] text-white' : 'bg-[#e8e8e8] text-black'} px-3 py-2 rounded-lg`}>
                                {
                                    chat.isGroupChat ?
                                        <div className='flex items-center justify-start gap-4 p-2'>
                                            <div className='avatar'><img src="https://picsum.photos/id/{group-logo}/237/200/300" alt="avatar" /></div>
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