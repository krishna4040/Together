import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { BsFillCameraVideoFill } from 'react-icons/bs'
import { BiSolidPhoneCall } from 'react-icons/bi'
import { io } from 'socket.io-client'

const ChatPage = ({ friend }) => {

    const { token } = useSelector(state => state.auth);
    const [chats, setChats] = useState({});
    const [sendText, setSendText] = useState('');

    const socket = io("http://localhost:4000");
    socket.on("connect", () => {
        console.log(socket);
    })

    const fecthPrevMessages = async () => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}getFriendChat`, {
                friend_id: friend._id,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response);
            setChats(response.data.data[0]);
        } catch (error) {
            console.log(error);
        }
    }

    const addChat = async (message, friend_id) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}addMessage`, {
                message,
                friend_id,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fecthPrevMessages();
    }, []);

    const sendHandler = () => {
        addChat(sendText, friend._id);
        setSendText('');
    }

    return (
        <div className='flex flex-col items-center justify-between w-[700px] h-[600px] rounded-md chat-gradient mx-auto p-5'>
            <div className='flex items-center w-full gap-5'>
                <div className='w-[50px] h-[50px] rounded-full overflow-hidden flex items-center justify-center p-1 border'>
                    <img src={friend.profileDetails.pfp} alt="user_image" className='w-full' />
                </div>
                <p className='text-xl font-semibold text-white capitalize'>{friend.userName}</p>
                <BsFillCameraVideoFill className='text-xl text-white' />
                <BiSolidPhoneCall className='text-xl text-white' />
            </div>
            <div className='flex flex-col w-full gap-2 p-5 overflow-y-auto text-white'>
                {
                    Object.keys(chats).length ?
                        chats.messages.map((message, index) => {
                            return (
                                <div key={index} className={`${message.whoSent === chats.friend ? 'self-start' : 'self-end'} px-4 py-2 bg-gray-950 rounded-md`}>
                                    <p>{message.message}</p>
                                    <p className='text-xs text-white uppercase'>~{message.whoSent}</p>
                                </div>
                            )
                        })
                        :
                        <div className='w-full text-lg text-center capitalize'>
                            Start Texting...
                        </div>
                }
            </div>
            <div className='flex items-center justify-center gap-5'>
                <input className='input success' placeholder='Enter text' value={sendText} onChange={(event) => { setSendText(event.target.value) }} />
                <button className="btn solid success" onClick={sendHandler}>Send</button>
            </div>
        </div>
    )
}

export default ChatPage