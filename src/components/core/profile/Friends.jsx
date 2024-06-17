import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFriend } from '../../../store/slices/user'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'


const Friends = ({ user }) => {

    const { token } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const removeHandler = async (friend) => {
        try {
            const response = await axios.put(`${import.meta.env.VITE_BASE_URL}/friends/removeFriend`, {
                friendId: friend._id
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (!response.data.success) {
                toast.error(response.data.message);
            }
            toast.error("Friend removed");
            dispatch(removeFriend(friend._id));
        } catch (error) {
            console.log(error);
        }
    }

    if (!user.friends.length) {
        return <p className='relative text-xl text-center text-white capitalize lg:translate-x-24'>No Friends Yet. Connect Now!</p>
    }

    return (
        <div className='flex lg:flex-row flex-col items-start justify-start lg:ml-[200px] gap-28 overflow-y-auto lg:h-[400px] mb-20 lg:mb-0'>
            <table className='border-separate border-spacing-4'>
                <thead>
                    <tr>
                        <th>Profile</th>
                        <th>Username</th>
                        <th>Visit</th>
                        <th>Remove</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        user.friends.map((friend, index) => {
                            return (
                                <tr key={index}>
                                    <td>
                                        <div className='w-[70px] h-[70px] rounded-full overflow-hidden flex items-center justify-center p-1 border'>
                                            <img src={friend?.profileDetails?.pfp} alt="pfp" />
                                        </div>
                                    </td>
                                    <td>{friend.userName}</td>
                                    <td><button onClick={() => { navigate(`/view-profile/${friend.userName}`) }} className='btn light info'>Visit</button></td>
                                    <td><button className='btn outline danger' onClick={() => { removeHandler(friend) }}>Remove</button></td>
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