import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedChat } from '../../../store/slices/chat'
import { FaArrowLeft } from "react-icons/fa";
import UpdateGroupChatModal from './utils/UpdatGroupChatModal'
import ScrollableChat from './utils/ScrollableChat'
import toast from 'react-hot-toast';
import { useSocket } from '../../../context/SocketContext';
import { useAxiosWithAuth } from '../../../hooks/useAxios';
import { IoSend } from "react-icons/io5";
import { IconButton } from '@mui/material';

let selectedChatCompare;

const ChatBox = ({ fetchAgain, setFetchAgain }) => {
    const socket = useSocket();

    const dispatch = useDispatch();
    const { selectedChat } = useSelector(state => state.chat);
    const user = useSelector(state => state.user);
    const axiosPrivate = useAxiosWithAuth();
    const getSender = (loggedUser, users) => {
        return users[0]._id === loggedUser._id ? users[1].userName : users[0].userName
    }

    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    const fetchMessages = async () => {
        if (!selectedChat) {
            return;
        }
        try {
            const { data } = await axiosPrivate.get(`/message/fetchMessages/${selectedChat._id}`)
            setMessages(data.data);
            socket.emit('joinChat', selectedChat._id);
        } catch (error) {
            toast.error("unable to fetch messages for the chat");
            console.log(error);
        }
    }

    useEffect(() => {
        fetchMessages();
        selectedChatCompare = selectedChat;

    }, [selectedChat]);

    useEffect(() => {
        socket.on('msgReceived', (msg) => {
            if (!selectedChatCompare || selectedChatCompare._id !== msg.chat) {
                // give notification
            } else {
                setMessages([...messages, msg]);
            }
        })

        return () => {
            socket.off("msgReceived")
        }
    }, []);

    const typingHandler = (e) => {
        setNewMessage(e.target.value)
    }

    const sendMessage = async (e) => {
        if (e.key === "Enter" && newMessage) {
            try {
                setNewMessage('');
                const { data } = await axiosPrivate.post('/message/sendMessage', {
                    content: newMessage,
                    chatId: selectedChat._id
                })
                socket.emit('newMsg', data.data);
                setMessages([...messages, data.data]);
            } catch (error) {
                toast.error("unable to send message");
                console.log(error);
            }
        }
    }

    return (
        <div className={`${selectedChat ? null : 'hidden'} lg:flex items-center flex-col bg-white rounded-lg lg:w-[55%] w-full mb-20 lg:mb-0`}>
            {
                selectedChat ?
                    <>
                        <div className='text-[28px] md:text-[30px] pb-3 px-2 w-full flex justify-between items-center'>
                            <FaArrowLeft className='flex lg:hidden md:hidden' onClick={() => { dispatch(setSelectedChat(null)) }} />
                            <div className='flex items-center justify-between w-[820px]'>
                                <p>
                                    {
                                        selectedChat.isGroupChat ?
                                            selectedChat.chatName.toUpperCase() :
                                            getSender(user, selectedChat.users)
                                    }
                                </p>
                                {
                                    selectedChat.isGroupChat && <UpdateGroupChatModal fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
                                }
                            </div>
                        </div>
                        <div className='flex flex-col justify-end p-3 bg-[#e8e8e8] w-full h-full rounded-lg overflow-y-hidden'>
                            <div className='messages'>
                                <ScrollableChat messages={messages} setMessages={setMessages} />
                            </div>
                            <div className='flex items-baseline justify-center gap-2'>
                                <input type="text" onChange={typingHandler} onKeyDown={sendMessage} value={newMessage} placeholder='Enter a message...' className='input bg-[#e0e0e0] mt-3' />
                                <IconButton onClick={sendMessage}><IoSend /></IconButton>
                            </div>
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