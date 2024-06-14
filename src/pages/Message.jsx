import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import ChatBox from '../components/core/chat/ChatBox'
import MyChat from '../components/core/chat/MyChat'
import SideBar from '../components/core/chat/SideBar'

const Message = () => {

    const user = useSelector(state => state.user);
    const [fetchAgain, setfetchAgain] = useState(false);

    return (
        <div className='w-full lg:ml-[200px] h-screen overflow-x-hidden'>
            <SideBar />
            <div className='flex gap-3 w-screen h-[91.5vh] p-2'>
                {Object.keys(user).length && <MyChat fetchAgain={fetchAgain} />}
                {Object.keys(user).length && <ChatBox fetchAgain={fetchAgain} setfetchAgain={setfetchAgain} />}
            </div>
        </div>
    )
}

export default Message