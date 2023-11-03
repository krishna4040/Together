import React, { useEffect, friendef, useState } from 'react';
import { LuSettings } from 'react-icons/lu'
import { useNavigate } from 'react-router-dom';

import Posts from '../components/core/profile/Posts'
import Liked from '../components/core/profile/Liked'
import Friends from '../components/core/profile/Friends'

const FriendProfile = (friend) => {

    const [step, setStep] = useState('posts');

    return (
        <div className='min-h-screen text-white bg-black'>
            {
                Object.keys(friend).length &&
                <>
                    <div className='flex items-center justify-center w-11/12 gap-5 p-8 ml-auto border-b border-gray-400'>
                        <div className='flex items-center justify-center w-[200px] h-[200px] rounded-full overflow-hidden p-6 border'>
                            <img src={friend.profileDetails.pfp} alt="friend" className='w-full' />
                        </div>
                        <div className='flex flex-col justify-center gap-5 p-4'>
                            <div className='flex items-center justify-center gap-3'>
                                <p className='text-xl font-semibold'>{friend.friendName}</p>
                                <button className='btn solid bw' onClick={editHandler}>Edit FriendProfile</button>
                                <button><LuSettings className='text-2xl text-white' /></button>
                            </div>
                            <div className='flex items-center w-full gap-3'>
                                <p>{friend.posts.length} Posts</p>
                                <p>{friend.friends.length} Friends</p>
                            </div>
                            <div>
                                <p className='text-xs uppercase'>About:</p>
                                <p>{friend.profileDetails.about}</p>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col items-center justify-center w-11/12 gap-5 p-8 ml-auto'>
                        <div className='text-white tabs bordered success bottom ml-[200px]'>
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

                        {step === 'liked' && <Liked user={friend} />}
                        {step === 'posts' && <Posts user={friend} />}
                        {step === 'friends' && <Friends user={friend} />}
                    </div>
                </>
            }
        </div>
    );
};

export default FriendProfile;