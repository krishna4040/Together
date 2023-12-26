import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import ChatBox from '../components/core/chat/ChatBox'
import MyChat from '../components/core/chat/MyChat'
import SideBar from '../components/core/chat/SideBar'
import { setSelectedChat, setChats } from '../store/slices/chat'
import axios from 'axios'

const Message = () => {

    const user = useSelector(state => state.user);
    const [fecthAgain, setFecthAgain] = useState(false);

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