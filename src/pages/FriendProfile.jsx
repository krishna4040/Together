import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Posts from '../components/core/friendsProfile/Posts'
import Friends from '../components/core/friendsProfile/Friends'
import { useSelector } from 'react-redux';
import Mutuals from '../components/core/friendsProfile/Mutuals';
import { ErrorButton, InfoButton, SuccessButton } from '../components/ui/Button';
import { useAxiosWithAuth } from '../hooks/useAxios';
import { Avatar } from '../components/ui/Avatar';

const FriendProfile = () => {
    const { userName } = useParams();
    const [friend, setFriend] = useState({});
    const [step, setStep] = useState('posts');
    const user = useSelector(state => state.user)
    const friendIds = user.friends.map(friend => friend._id);
    const navigate = useNavigate();
    const axiosPrivate = useAxiosWithAuth();

    const fetchFriend = async () => {
        try {
            const { data } = await axiosPrivate.get(`/all-users/search?userName=${userName}`)
            setFriend(data.data);
        } catch (error) {
            console.log(error);
        }
    }

    const connectHandler = async (friend) => {
        try {
            if (friend.profileDetails.visibility === 'public') {
                const { data } = await axiosPrivate.post(`/friends/followFriend`, { friendId: friend._id });
                if (!data.success) {
                    throw new Error(response.data.message);
                }
                fetchUser(userName)
                toast.success("friend followed!");
            } else {
                const { data } = await axiosPrivate.post(`/friends/sendFriendRequest`, { friendId: friend._id });
                if (!data.success) {
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
            const { data } = await axiosPrivate.put('/friends/withdrawFriendRequest', { friendId: friend._id })
            if (!data.success) {
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
            const { data } = await axiosPrivate.post('/friends/removeFriend', { friendId: friend._id });
            if (!data.success) {
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
    }, [navigate])

    useEffect(() => {
        fetchFriend();
    }, [userName]);

    return (
        <div className='min-h-screen text-white bg-black'>
            {
                friend && Object.keys(friend).length &&
                <>
                    <div className='flex flex-col items-center justify-center w-11/12 gap-5 p-8 ml-auto border-b border-gray-400 lg:flex-row'>
                        <Avatar src={friend.profileDetails.pfp} w={200} h={200} p={24} border />
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
                                        <ErrorButton onClick={() => removeHandler(friend)} text={"Remove"} /> :
                                        friend.requests.find(req => req._id === user._id) ?
                                            <InfoButton onClick={() => withDrawHandler(friend)} text={"Requested"} /> :
                                            <SuccessButton onClick={() => connectHandler(friend)} text={friend.profileDetails.visibility === 'public' ? "Follow" : "Request"} />
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