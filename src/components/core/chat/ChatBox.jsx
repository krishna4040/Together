import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedChat } from '../../../store/slices/chat'
import { FaArrowLeft } from "react-icons/fa";
import UpdateGroupChatModal from './utils/UpdatGroupChatModal'
import ScrollableChat from './utils/ScrollableChat'
import axios from 'axios';
import toast from 'react-hot-toast';

const ChatBox = ({ fecthAgain, setFecthAgain }) => {
    const dispacth = useDispatch();
    const { selectedChat } = useSelector(state => state.chat);
    const user = useSelector(state => state.user);
    const { token } = useSelector(state => state.auth);
    const getSender = (loggedUser, users) => {
        return users[0]._id === loggedUser._id ? users[1].userName : users[0].userName
    }

    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    const fecthMessages = async () => {
        if (!selectedChat) {
            return;
        }
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/message/fecthMessages/${selectedChat._id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setMessages(data.data);
        } catch (error) {
            toast.error("unable to fecth messages for the chat");
            console.log(error);
        }
    }

    useEffect(() => {
        fecthMessages();
    }, [selectedChat]);

    const typingHandler = (e) => {
        setNewMessage(e.target.value)
    }

    const sendMessage = async (e) => {
        if (e.key === "Enter" && newMessage) {
            try {
                setNewMessage('');
                const { data } = await axios.post(`${import.meta.env.VITE_BASE_URL}/message/sendMessage`, {
                    content: newMessage,
                    chatId: selectedChat._id
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setMessages(prev => {
                    return [...prev, data.data]
                });
            } catch (error) {
                toast.error("unable to send message");
                console.log(error);
            }
        }
    }

    return (
        <div className={`${selectedChat ? null : 'hidden'} md:flex lg:flex items-center flex-col bg-white w-full md:w-[68%] rounded-lg border`}>
            {
                selectedChat ?
                    <>
                        <div className='text-[28px] md:text-[30px] pb-3 px-2 w-full flex justify-between items-center'>
                            <FaArrowLeft className='flex lg:hidden md:hidden' onClick={() => { dispacth(setSelectedChat(null)) }} />
                            <div className='flex items-center justify-between w-[820px]'>
                                <p>
                                    {
                                        selectedChat.isGroupChat ?
                                            selectedChat.chatName.toUpperCase() :
                                            getSender(user, selectedChat.users)
                                    }
                                </p>
                                {
                                    selectedChat.isGroupChat && <UpdateGroupChatModal fecthAgain={fecthAgain} setFecthAgain={setFecthAgain} />
                                }
                            </div>
                        </div>
                        <div className='flex flex-col justify-end p-3 bg-[#e8e8e8] w-full h-full rounded-lg overflow-y-hidden'>
                            <div className='messages'>
                                <ScrollableChat messages={messages} setMessages={setMessages} />
                            </div>
                            <input type="text" onChange={typingHandler} onKeyDown={sendMessage} value={newMessage} placeholder='Enter a message...' className='input bg-[#e0e0e0] mt-3' />
                        </div>
                    </>
                    :
                    <div className='flex items-center justify-center h-full'>
                        <p className='pb-3 text-3xl'>
                            Click on a user to start chatting
                        </p>
                    </div>
            }
        </div>
    )
}

export default ChatBox