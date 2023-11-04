import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import ChatPage from '../components/core/chat/ChatPage'

const Chat = () => {

    const user = useSelector(state => state.user);
    const [selectedFriend, setSelectedFriend] = useState({});

    return (
        <div className='flex items-center justify-between lg:ml-[230px] min-h-screen'>
            <table className='border-r border-separate border-gray-500 border-spacing-3'>
                <tbody>
                    {
                        user.friends.map((friend, index) => {
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
            {Object.keys(selectedFriend).length ? <ChatPage friend={selectedFriend} /> : null}
        </div>
    )
}

export default Chat