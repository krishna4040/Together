import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Friends = ({ friend }) => {

    const [friends, setFriends] = useState([]);
    const navigate = useNavigate();
    const fecthFriends = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/friends/getFriends?id=${friend._id}`);
            setFriends(response.data.data);
            console.log(response.data.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fecthFriends();
    }, []);

    if (!friends.length) {
        return <p className='relative text-xl text-center text-white capitalize translate-x-24'>No Friends Yet. Connect Now!</p>
    }

    return (
        <div className='flex items-center justify-center ml-[200px] gap-28'>
            <table className='border border-separate border-spacing-4'>
                <thead>
                    <tr>
                        <th>Profile</th>
                        <th>Username</th>
                        <th>Visit</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        friends.map((friend, index) => {
                            return (
                                index < Math.ceil(friends.length / 2) &&
                                <tr key={index}>
                                    <td>
                                        <div className='w-[70px] h-[70px] rounded-full overflow-hidden flex items-center justify-center p-1 border'>
                                            <img src={friend.profileDetails.pfp} alt="pfp" />
                                        </div>
                                    </td>
                                    <td>{friend.userName}</td>
                                    <td><button onClick={() => { navigate(`/view-profile/${friend.userName}`) }} className='btn light info'>Visit</button></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            <table className='border border-separate border-spacing-4'>
                <thead>
                    <tr>
                        <th>Profile</th>
                        <th>Username</th>
                        <th>Visit</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        friends.map((friend, index) => {
                            return (
                                index >= Math.ceil(friends.length / 2) &&
                                <tr key={index}>
                                    <td>
                                        <div className='w-[70px] h-[70px] rounded-full overflow-hidden flex items-center justify-center p-1 border'>
                                            <img src={friend.profileDetails.pfp} alt="pfp" />
                                        </div>
                                    </td>
                                    <td>{friend.userName}</td>
                                    <td><button onClick={() => { navigate(`/view-profile/${friend.userName}`) }} className='btn light info'>Visit</button></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Friends