import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'

const Friends = ({ friend, setStep }) => {
    const [friends, setFriends] = useState([]);
    const navigate = useNavigate();
    const currentUser = useSelector(state => state.user)
    const fetchFriends = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/friends/getFriends?id=${friend._id}`);
            setFriends(response.data.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchFriends();
    }, []);

    const visitHandler = (friend) => {
        currentUser._id !== friend._id ?
            navigate(`/view-profile/${friend.userName}`) :
            navigate(`/profile`)
        setStep("posts")
    }

    if (!friends.length) {
        return <p className='relative text-xl text-center text-white capitalize translate-x-24'>No Friends Yet. Connect Now!</p>
    }

    return (
        <div className='flex lg:flex-row flex-col items-start justify-start lg:ml-[200px] gap-28 overflow-y-auto lg:h-[400px] mb-20 lg:mb-0'>
            <table className='border-separate border-spacing-4'>
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
                                <tr key={index}>
                                    <td>
                                        <div className='w-[70px] h-[70px] rounded-full overflow-hidden flex items-center justify-center p-1 border'>
                                            <img src={friend?.profileDetails?.pfp} alt="pfp" />
                                        </div>
                                    </td>
                                    <td>{friend.userName}</td>
                                    <td><button onClick={() => visitHandler(friend)} className='btn light info'>Visit</button></td>
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