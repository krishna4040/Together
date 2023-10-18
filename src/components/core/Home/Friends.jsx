import React, { useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';

const Friends = () => {

    const [friends , setFriends] = useState([]);
    const {token} = useSelector(state => state.user);
    const fecthFriends = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}getUserDetails`,{withCredentials: true , headers:{Authorization: `Bearer ${token}`}});
            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            setFriends(response.data.data.friends);
        } catch (error) {
            console.log(error);
            toast.error('unable to fecth friends');
        }
    }

    useEffect(() => {
        fecthFriends();
    },[]);

    return (
        <div className='flex items-center justify-start h-24 gap-5 p-4 overflow-x-auto overflow-y-hidden'>
            {
                friends.map((friend,index) => {
                    return(
                        <div key={index} className='h-[80px] w-[80px] border rounded-full overflow-hidden hover:scale-110 duration-200 transition-all'>
                            <img src={friend.profileDetails.pfp} alt="friend" className='w-full'/>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Friends