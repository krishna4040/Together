import React, { useState } from 'react'
import ChatBox from '../components/core/chat/ChatBox'
import MyChat from '../components/core/chat/MyChat'
import SideBar from '../components/core/chat/SideBar'

const Message = () => {
    const [fetchAgain, setFetchAgain] = useState(false);

    return (
        <div className='w-full lg:ml-[200px] h-screen overflow-x-hidden'>
            <SideBar />
            <div className='flex gap-3 w-screen h-[91.5vh] p-2'>
                <MyChat fetchAgain={fetchAgain} />
                <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
            </div>
        </div>
    )
}

export default Message