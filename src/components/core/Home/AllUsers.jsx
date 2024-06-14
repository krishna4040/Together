import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { sendFriendRequest, removeFriend } from '../../../store/slices/user'

const AllUsers = () => {

    const { token } = useSelector(state => state.auth);
    const currentUser = useSelector(state => state.user);
    const [users, setUsers] = useState([]);
    const dispatch = useDispatch();

    const fetchAllUsers = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/all-users/getAllUsers`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setUsers(response.data.data);
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        fetchAllUsers();
    }, [currentUser.requests.length]);

    const connectHandler = async (friend) => {
        try {
            const response = await axios.put(`${import.meta.env.VITE_BASE_URL}/friends/sendFriendRequest`, {
                friendId: friend._id
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            toast.success("Friend connected");
            dispatch(sendFriendRequest(friend));
        } catch (error) {
            console.log(error);
        }
    }

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
                throw new Error(response.data.message);
            }
            toast.error("Friend removed");
            dispatch(removeFriend(friend._id));
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <h1 className=''>Suggestions</h1>
            <table className='border-separate border-spacing-3'>
                <tbody>
                    {
                        users.length ?
                            users.map((user, index) => {
                                return (
                                    <tr key={index}>
                                        <td>
                                            <div className='w-[50px] h-[50px] rounded-full overflow-hidden flex items-center justify-center p-1 border'>
                                                <img src={user?.profileDetails?.pfp} alt="user_image" className='w-full' />
                                            </div>
                                        </td>
                                        <td>
                                            <p className='min-w-[55px] text-lg capitalize text-white'>{user.userName}</p>
                                        </td>
                                        <td>
                                            {
                                                currentUser.friends.find(friend => friend._id === user._id) ?
                                                    <button className='btn outline danger' onClick={() => { removeHandler(user) }}>Remove</button> :
                                                    user.requests.find(req => req._id === currentUser._id) ?
                                                        <button className='btn outline info' disabled>Requested</button> :
                                                        <button className='btn solid success' onClick={() => { connectHandler(user) }}>Connect</button>
                                            }
                                        </td>
                                    </tr>
                                )
                            })
                            :
                            <tr className='w-screen h-screen text-center'>
                                <td className='loader'></td>
                            </tr>
                    }
                </tbody>
            </table>
        </>
    )
}

export default AllUsers