import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

const AllUsers = () => {

    const { token } = useSelector(state => state.user);
    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState({});

    const fecthCurrentUserDetails = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}getUserDetails`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setCurrentUser(response.data.data);
        } catch (error) {
            console.log(error);
        }
    }

    const fecthAllUsers = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}search`, {
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
        fecthAllUsers();
        fecthCurrentUserDetails();
    }, []);

    const connectHandler = async (friend) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}makeFriend`, {
                friendId: friend._id
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            toast.success("Friend connected");
            fecthCurrentUserDetails();
        } catch (error) {
            console.log(error);
        }
    }

    const removeHandler = async (friend) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}removeFriend`, {
                friendId: friend._id
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            toast.error("Friend removed");
            fecthCurrentUserDetails();
        } catch (error) {
            console.log(error);
        }
    }

    //  className='flex flex-col items-center justify-center gap-3 p-10'
    //  className='flex items-center gap-5'

    return (
        <table className='border-separate border-spacing-3'>
            <tbody>
                {
                    users.length && Object.keys(currentUser).length ?
                        users.map((user, index) => {
                            return (
                                <tr key={index}>
                                    <td>
                                        <div className='w-[50px] h-[50px] rounded-full overflow-hidden flex items-center justify-center p-1 border'>
                                            <img src={user.profileDetails.pfp} alt="user_image" className='w-full' />
                                        </div>
                                    </td>
                                    <td>
                                        <p className='min-w-[55px] text-lg capitalize text-white'>{user.userName}</p>
                                    </td>
                                    <td>
                                        {
                                            currentUser.friends.find(friend => friend._id === user._id) ?
                                                <button className='btn outline danger' onClick={() => { removeHandler(user) }}>Remove</button> :
                                                <button className='btn outline success' onClick={() => { connectHandler(user) }}>Connect</button>
                                        }
                                    </td>
                                </tr>
                            )
                        })
                        :
                        <div className='w-screen h-screen text-center'>
                            <span className='loader'></span>
                        </div>
                }
            </tbody>
        </table>
    )
}

export default AllUsers