import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import ChatBox from '../components/core/chat/ChatBox'
import MyChat from '../components/core/chat/MyChat'
import SideBar from '../components/core/chat/SideBar'
import { setSelectedChat, setChats } from '../store/slices/chat'
import axios from 'axios'

const Message = () => {

    const user = useSelector(state => state.user);
    const chat = useSelector(state => state.chat);
    const { token } = useSelector(state => state.auth);
    const [fecthAgain, setFecthAgain] = useState(false);
    const [loading, setLoading] = useState(false);

    const accessChat = async (userId) => {
        try {
            setLoading(true);
            const { data } = await axios.post(`${import.meta.env.VITE_BASE_URL}/chat/accessChat`, {
                userId
            }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            });
            setSelectedChat(data);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='w-full lg:ml-[200px]'>
            <SideBar />
            <div className='flex justify-between w-screen h-[91.5vh]'>
                {Object.keys(user).length && <MyChat fecthAgain={fecthAgain} />}
                {Object.keys(user).length && <ChatBox fecthAgain={fecthAgain} setFecthAgain={setFecthAgain} />}
            </div>
        </div>
    )
}

export default Message