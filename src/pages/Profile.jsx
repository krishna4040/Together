import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { LuSettings } from 'react-icons/lu'
import { useNavigate } from 'react-router-dom';

import Posts from '../components/core/profile/Posts'
import Liked from '../components/core/profile/Liked'
import Friends from '../components/core/profile/Friends'
import { InfoButton, SettingsButton } from '../components/ui/Button';

const Profile = () => {

    const user = useSelector(state => state.user);
    const [step, setStep] = useState('posts');

    const navigate = useNavigate();
    const editHandler = () => {
        navigate('/edit-profile');
    }

    return (
        <div className='min-h-screen text-white bg-black'>
            {
                Object.keys(user).length &&
                <>
                    <div className='flex flex-col items-center justify-center w-11/12 gap-5 p-8 ml-auto border-b border-gray-400 lg:flex-row'>
                        <div className='flex items-center justify-center w-[200px] h-[200px] rounded-full overflow-hidden p-6 border'>
                            <img src={user.profileDetails.pfp} alt="user" className='w-full' />
                        </div>
                        <div className='flex flex-col justify-center gap-5 p-4'>
                            <div className='flex items-center justify-center gap-3'>
                                <p className='text-xl font-semibold'>{user.userName}</p>
                                <InfoButton text={"Edit Profile"} onClick={editHandler} />
                                <SettingsButton />
                            </div>
                            <div className='flex items-center w-full gap-3'>
                                <p>{user.posts.length} Posts</p>
                                <p>{user.friends.length} Friends</p>
                            </div>
                            <div className='flex flex-row items-center justify-start gap-2 lg:flex-col lg:justify-start lg:items-start'>
                                <p className='text-xs uppercase'>About:</p>
                                <p>{user.profileDetails.about}</p>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col items-center justify-center w-full gap-5 p-8 lg:w-11/12 lg:ml-auto'>
                        <div className='text-white tabs bordered success bottom lg:ml-[200px]'>
                            <div className={`p-4 tab ${step === 'posts' ? 'active' : null}`} onClick={() => { setStep('posts') }}>
                                Posts
                            </div>
                            <div className={`p-4 tab ${step === 'liked' ? 'active' : null}`} onClick={() => { setStep('liked') }}>
                                Liked
                            </div>
                            <div className={`p-4 tab ${step === 'friends' ? 'active' : null}`} onClick={() => { setStep('friends') }}>
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