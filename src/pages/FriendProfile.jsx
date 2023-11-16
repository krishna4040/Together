import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Posts from '../components/core/friendsProfile/Posts'
import Friends from '../components/core/friendsProfile/Friends'

const FriendProfile = () => {

    const { userName } = useParams();
    const [friend, setFriend] = useState({});
    const [step, setStep] = useState('posts');

    const fecthFriend = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/all-users/search?userName=${userName}`);
            setFriend(response.data.data[0]);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fecthFriend();
    }, [friend]);

    return (
        <div className='min-h-screen text-white bg-black'>
            {
                Object.keys(friend).length &&
                <>
                    <div className='flex items-center justify-center w-11/12 gap-5 p-8 ml-auto border-b border-gray-400'>
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
                            <div className={`p-4 tab ${step === 'friends' ? 'active' : null}`} onClick={() => { setStep('friends') }}>
                                Friends
                            </div>
                        </div>
                        {step === 'posts' && <Posts friend={friend} />}
                        {step === 'friends' && <Friends friend={friend} setStep={setStep} />}
                    </div>
                </>
            }
        </div>
    );
};

export default FriendProfile;