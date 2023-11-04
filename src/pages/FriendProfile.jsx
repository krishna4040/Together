import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const FriendProfile = () => {

    const { userName } = useParams();
    const [friend, setFriend] = useState({});

    const fecthFriend = async () => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}searchByUsername`, {
                userName
            });
            setFriend(response.data.data[0]);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fecthFriend();
    }, []);

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
                </>
            }
        </div>
    );
};

export default FriendProfile;