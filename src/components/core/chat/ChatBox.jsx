import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedChat } from '../../../store/slices/chat'
import { FaArrowLeft } from "react-icons/fa";

const ChatBox = () => {
    const dispacth = useDispatch();
    const { selectedChat } = useSelector(state => state.chat);
    const user = useSelector(state => state.user);
    const getSender = (loggedUser, users) => {
        return users[0]._id === loggedUser._id ? users[1].userName : users[0].userName
    }
    return (
        <div className={`${selectedChat ? null : 'hidden'} md:flex lg:flex items-center flex-col bg-white w-full md:w-[68%] rounded-lg border`}>
            {
                selectedChat ?
                    <>
                        <div className='text-[28px] md:text-[30px] pb-3 px-2 w-full flex justify-between items-center'>
                            <FaArrowLeft className='flex lg:hidden md:hidden' onClick={() => { dispacth(setSelectedChat(null)) }} />
                            <h1>
                                {
                                    !selectedChat.isGroupChat ?
                                        getSender(user, selectedChat.users) :
                                        selectedChat.chatName.toUpperCase()
                                }
                            </h1>
                        </div>
                        <div className='flex flex-col justify-end p-3 bg-[#e8e8e8] w-full h-full rounded-lg overflow-y-hidden'>
                            {/* Messages here */}
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