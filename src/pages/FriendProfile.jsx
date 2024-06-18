import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Posts from '../components/core/friendsProfile/Posts'
import Friends from '../components/core/friendsProfile/Friends'
import { useSelector } from 'react-redux';
import Mutuals from '../components/core/friendsProfile/Mutuals';

const FriendProfile = () => {
    const { userName } = useParams();
    const [friend, setFriend] = useState({});
    const [step, setStep] = useState('posts');
    const user = useSelector(state => state.user)
    const friendIds = user.friends.map(friend => friend._id);
    const navigate = useNavigate();

    const fetchFriend = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/all-users/search?userName=${userName}`);
            setFriend(response.data.data);
        } catch (error) {
            console.log(error);
        }
    }

    const connectHandler = async (friend) => {
        try {
            if (friend.profileDetails.visibility === 'public') {
                const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/friends/followFriend`, {
                    friendId: friend._id
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (!response.data.success) {
                    throw new Error(response.data.message);
                }
                fetchUser(userName)
                toast.success("friend followed!");
            } else {
                const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/friends/sendFriendRequest`, {
                    friendId: friend._id
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (!response.data.success) {
                    throw new Error(response.data.message);
                }
                fetchUser(userName)
                toast.success("friend request sent!");
            }
        } catch (error) {
            console.log(error);
        }
    }

    const withDrawHandler = async (friend) => {
        try {
            const response = await axios.put(`${import.meta.env.VITE_BASE_URL}/friends/withdrawFriendRequest`, {
                friendId: friend._id
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            fetchUser(userName)
            toast.error("Request withdrawn!!")
        } catch (error) {
            console.log(error)
        }
    }

    const removeHandler = async (friend) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/friends/removeFriend`, {
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

    useEffect(() => {
        if (window.location.pathname === `/view-profile/${user.userName}`) {
            navigate('/home');
        }
    },[navigate])

    useEffect(() => {
        fetchFriend();
    }, [userName]);

    return (
        <div className='min-h-screen text-white bg-black'>
            {
                friend && Object.keys(friend).length &&
                <>
                    <div className='flex flex-col items-center justify-center w-11/12 gap-5 p-8 ml-auto border-b border-gray-400 lg:flex-row'>
                        <div className='flex items-center justify-center w-[200px] h-[200px] rounded-full overflow-hidden p-6 border'>
                            <img src={friend?.profileDetails?.pfp} alt="friend" className='w-full' />
                        </div>
                        <div className='flex flex-col justify-center gap-5 p-4'>
                            <div className='flex items-center justify-center gap-3'>
                                <p className='text-xl font-semibold'>{friend.friendName}</p>
                            </div>
                            <div className='flex items-center w-full gap-3'>
                                <p>{friend.posts.length} Posts</p>
                                <p>{friend.friends.length} Friends</p>
                            </div>
                            <div className='flex flex-row items-center justify-start gap-2 lg:flex-col lg:justify-start lg:items-start'>
                                <p className='text-xs uppercase'>About:</p>
                                <p>{friend.profileDetails.about}</p>
                            </div>
                            <div>
                                {
                                    user.friends.find(fr => fr._id === friend._id) ?
                                        <button className='btn outline danger' onClick={() => { removeHandler(friend) }}>Remove</button> :
                                        friend.requests.find(req => req._id === friend._id) ?
                                            <button className='btn outline info' onClick={() => { withDrawHandler(friend) }}>Requested</button> :
                                            <button className='btn solid success' onClick={() => { connectHandler(friend) }}>
                                                {
                                                    friend.profileDetails.visibility === 'public' ?
                                                        "Follow" :
                                                        "Request"
                                                }
                                            </button>
                                }
                            </div>
                            <Mutuals userId={friend._id} />
                        </div>
                    </div>
                    {
                        (friend.profileDetails.visibility === 'public' || friendIds.includes(friend._id)) ?
                            <div className='flex flex-col items-center justify-center w-full gap-5 p-8 lg:w-11/12 lg:ml-auto'>
                                <div className='text-white tabs bordered success bottom lg:ml-[200px]'>
                                    <div className={`p-4 tab ${step === 'posts' ? 'active' : null}`} onClick={() => { setStep('posts') }}>
                                        Posts
                                    </div>
                                    <div className={`p-4 tab ${step === 'friends' ? 'active' : null}`} onClick={() => { setStep('friends') }}>
                                        Friends
                                    </div>
                                </div>
                                {step === 'posts' && <Posts friend={friend} />}
                                {step === 'friends' && <Friends friend={friend} setStep={setStep} />}
                            </div> :
                            <div className='flex flex-col items-center justify-center w-full gap-5 p-8 lg:w-11/12 lg:ml-auto'>
                                <p>This is a Private Account. Send a Friend Request</p>
                            </div>
                    }
                </>
            }
        </div>
    );
};

export default FriendProfile;