import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux';
import ChatPage from '../components/core/chat/ChatPage'

const Chat = () => {

    const { token } = useSelector(state => state.user);
    const [friends, setFriends] = useState([]);

    const fecthFriends = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}getUserDetails`, { withCredentials: true, headers: { Authorization: `Bearer ${token}` } });
            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            setFriends(response.data.data.friends);
        } catch (error) {
            console.log(error);
            toast.error('unable to fecth friends');
        }
    }

    useEffect(() => {
        fecthFriends();
    }, []);

    const [selectedFriend, setSelectedFriend] = useState({});

    return (
        <div className='flex items-center justify-between ml-[230px] min-h-screen'>
            <table className='border-r border-separate border-gray-500 border-spacing-3'>
                <tbody>
                    {
                        friends.map((friend, index) => {
                            return (
                                <tr key={index}>
                                    <td>
                                        <div className='w-[50px] h-[50px] rounded-full overflow-hidden flex items-center justify-center p-1 border'>
                                            <img src={friend.profileDetails.pfp} alt="user_image" className='w-full' />
                                        </div>
                                    </td>
                                    <td>
                                        <p className='min-w-[55px] text-lg capitalize text-white'>{friend.userName}</p>
                                    </td>
                                    <td>
                                        <button className='btn outline success' onClick={() => { setSelectedFriend(friend) }}>Message</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            {selectedFriend ? <ChatPage friend={selectedFriend} /> : null}
        </div>
    )
}

export default Chat