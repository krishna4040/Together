import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { LuSettings } from 'react-icons/lu'
import { useNavigate } from 'react-router-dom';

import Posts from '../components/core/profile/Posts'
import Liked from '../components/core/profile/Liked'
import Friends from '../components/core/profile/Friends'

const Profile = () => {

    const { token } = useSelector(state => state.user);
    const [user, setUser] = useState({});

    const [step, setStep] = useState('posts');

    const fecthUser = async () => {
        try {
            const respose = await axios.get(`${import.meta.env.VITE_BASE_URL}getUserDetails`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setUser(respose.data.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fecthUser();
    }, []);

    const navigate = useNavigate();
    const editHandler = () => {
        navigate('/edit-profile');
    }

    return (
        <div className='min-h-screen text-white bg-black'>
            {
                Object.keys(user).length &&
                <>
                    <div className='flex items-center justify-center w-11/12 gap-5 p-8 ml-auto border-b border-gray-400'>
                        <div className='flex items-center justify-center w-[200px] h-[200px] rounded-full overflow-hidden p-6 border'>
                            <img src={user.profileDetails.pfp} alt="user" className='w-full' />
                        </div>
                        <div className='flex flex-col justify-center gap-5 p-4'>
                            <div className='flex items-center justify-center gap-3'>
                                <p className='text-xl font-semibold'>{user.userName}</p>
                                <button className='btn solid bw' onClick={editHandler}>Edit Profile</button>
                                <button><LuSettings className='text-2xl text-white' /></button>
                            </div>
                            <div className='flex items-center w-full gap-3'>
                                <p>{user.posts.length} Posts</p>
                                <p>{user.friends.length} Friends</p>
                            </div>
                            <div>
                                <p className='text-xs uppercase'>About:</p>
                                <p>{user.profileDetails.about}</p>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col items-center justify-center w-11/12 gap-5 p-8 ml-auto'>
                        <div className='text-white tabs bordered success bottom ml-[200px]'>
                            <div className={`p-4 tab ${step === 'posts' ? 'active': null}`} onClick={() => { setStep('posts') }}>
                                Posts
                            </div>
                            <div className={`p-4 tab ${step === 'liked' ? 'active': null}`} onClick={() => { setStep('liked') }}>
                                Liked
                            </div>
                            <div className={`p-4 tab ${step === 'friends' ? 'active': null}`} onClick={() => { setStep('friends') }}>
                                Friends
                            </div>
                        </div>

                        {step === 'liked' && <Liked user={user} />}
                        {step === 'posts' && <Posts user={user} />}
                        {step === 'friends' && <Friends user={user} />}
                    </div>
                </>
            }
        </div>
    );
};

export default Profile;