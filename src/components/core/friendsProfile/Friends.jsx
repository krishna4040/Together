import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { InfoButton } from '../../ui/Button';
import { useAxiosWithoutAuth } from '../../../hooks/useAxios';
import { Avatar } from '../../ui/Avatar';

const Friends = ({ friend, setStep }) => {
    const [friends, setFriends] = useState([]);
    const navigate = useNavigate();
    const currentUser = useSelector(state => state.user)
    const axiosPublic = useAxiosWithoutAuth()

    const fetchFriends = async () => {
        try {
            const response = await axiosPublic.get(`/friends/getFriends?id=${friend._id}`);
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
                                    <td><Avatar w={70} h={70} p={4} border src={friend.profileDetails.pfp} /></td>
                                    <td>{friend.userName}</td>
                                    <td><InfoButton onClick={() => visitHandler(friend)} text={"Visit"} /></td>
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