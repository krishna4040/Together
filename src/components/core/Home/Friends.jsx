import React, { useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast';

const Friends = () => {

    const [friends , setFriends] = useState([]);
    
    const fecthFriends = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}getUserDetails`,{withCredentials: true});
            console.log(response);
            if (!response.data.succsess) {
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
        <div className='flex items-center justify-center'>
            {
                friends.map((friend,index) => {
                    return(
                        <div key={index}>
                            <img src={friend.profileDetails.pfp} alt="friend" />
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Friends