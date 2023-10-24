import React, { useEffect, useState } from 'react'
import axios from 'axios';

const AllUsers = () => {

    const [users, setUsers] = useState([]);

    const fecthAllUsers = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}search`);
            setUsers(response.data.data);
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        fecthAllUsers();
    },[])

    return (
        <div className='flex flex-col items-center justify-center gap-3 p-10'>
            {
                users.map((user,index) => {
                    return(
                        <div key={index} className='flex items-center gap-5'>
                            <div className='w-[50px] h-[50px] rounded-full overflow-hidden flex items-center justify-center p-1 border'>
                                <img src={user.profileDetails.pfp} alt="user_image" className='w-full' />
                            </div>
                            <p className='min-w-[55px] text-lg capitalize text-white'>{user.userName}</p>
                            <button className='btn outline success'>Connect</button>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default AllUsers