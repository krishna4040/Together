import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { setFriend, removeFriend } from '../../store/slices/user'
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';

const Search = ({ setSearch }) => {

    const currentUser = useSelector(state => state.user);
    const { token } = useSelector(state => state.auth);
    const [userName, setUserName] = useState('');
    const [user, setUser] = useState({});
    const navigate = useNavigate();
    const dispacth = useDispatch();

    const fecthUser = async () => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}searchByUsername`, { userName });
            if (response.data.success) {
                setUser(response.data.data[0]);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const connectHandler = async (friend) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}makeFriend`, {
                friendId: friend._id
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            toast.success("friend connected");
            dispacth(setFriend(friend));
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
            dispacth(removeFriend(friend._id));
        } catch (error) {
            console.log(error);
        }
    }

    const visitHandler = (userName) => {
        navigate(`/view-profile/${userName}`);
    }

    return (
        <div>
            <label className="modal-overlay"></label>
            <div className="flex flex-col w-full lg:w-[25%] gap-5 modal show pause-scroll">
                <button className="absolute right-4 top-3" onClick={() => { setSearch(false) }}>✕</button>
                <h2 className="text-xl">Search</h2>
                <div className='flex items-center gap-1'>
                    <div className='is-divider' />
                    <input placeholder='Enter Username to search' value={userName} onChange={(event) => { setUserName(event.target.value) }} className='input success' />
                </div>
                {
                    Object.keys(user).length ?
                        <div className='flex flex-col items-center gap-5'>
                            <div className='flex flex-col items-center justify-center'>
                                <div className='w-[50px] h-[50px] rounded-full overflow-hidden'>
                                    <img src={user.profileDetails.pfp} alt="user_image" className='w-full' />
                                </div>
                                <p className='min-w-[55px] text-lg capitalize'>{user.userName}</p>
                            </div>
                            <div className='flex items-center justify-center gap-5'>
                                {
                                    currentUser.friends.find(friend => friend._id === user._id) ?
                                        <button className='btn outline danger' onClick={() => { removeHandler(user) }}>Remove</button> :
                                        <button className='btn outline success' onClick={() => { connectHandler(user) }}>Connect</button>
                                }
                                <button className='btn outline danger' onClick={() => { visitHandler(user.userName) }}>Visit</button>
                            </div>
                        </div>
                        :
                        null
                }
                <div className="flex gap-3">
                    <button className="flex-1 btn solid danger" onClick={() => { fecthUser() }}>Search</button>
                </div>
            </div>
        </div>
    )
}

export default Search