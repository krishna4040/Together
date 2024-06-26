import React from 'react'
import { useDispatch } from 'react-redux'
import { removeFriend } from '../../../store/slices/user'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { ErrorButton, InfoButton } from '../../ui/Button'
import { useAxiosWithAuth } from '../../../hooks/useAxios'
import { Avatar } from '../../ui/Avatar'


const Friends = ({ user }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const axiosPrivate = useAxiosWithAuth()

    const removeHandler = async (friend) => {
        try {
            const { data } = await axiosPrivate.put('/friends/removeFriend', { friendId: friend._id })
            if (!data.success) {
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
                                    <td><Avatar w={70} h={70} p={4} border src={friend?.profileDetails?.pfp} /></td>
                                    <td>{friend.userName}</td>
                                    <td><InfoButton onClick={() => navigate(`/view-profile/${friend.userName}`)} text={"Visit"} /></td>
                                    <td><ErrorButton onClick={() => removeHandler(friend)} text={"Remove"} /></td>
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