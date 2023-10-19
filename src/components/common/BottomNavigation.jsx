import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { AiFillHome } from 'react-icons/ai'
import { IoCreateOutline } from 'react-icons/io5'
import { BiMessageSquareDots, BiSearch } from 'react-icons/bi'
import { FiLogOut } from 'react-icons/fi'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const BottomNavigation = ({ setSearch, setLogout }) => {

    const arr = [
        { title: 'Home', icon: AiFillHome, link: '/' },
        { title: 'Search', icon: BiSearch, clickHandler: setSearch },
        { title: 'Messages', icon: BiMessageSquareDots, link: '/chat' },
        { title: 'Create', icon: IoCreateOutline, link: '/create' },
        { title: 'Profile', icon: AiFillHome, link: '/profile' },
        { title: 'Logout', icon: FiLogOut, clickHandler: setLogout },
    ];

    const navigate = useNavigate();

    const [pfp, setPfp] = useState('');
    const { token } = useSelector(state => state.user);

    const fecthUser = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}getUserDetails`, { withCredentials: true, headers: { Authorization: `Bearer ${token}` } });
            setPfp(response.data.data.profileDetails.pfp);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fecthUser();
    }, []);

    return (
        <div className='fixed bottom-0 left-0 right-0 flex items-center justify-center gap-8 p-5 bg-black lg:hidden'>
            {
                arr.map((item, index) => {
                    return (
                        <div key={index} onClick={() => { item.link ? navigate(item.link) : item.clickHandler(true) }}>
                            {
                                item.title !== 'Profile' ? <item.icon className='text-3xl text-white' />
                                    :
                                    <div className='flex items-center justify-center w-12 h-12 p-2 overflow-hidden border rounded-full'>
                                        <img src={pfp} alt="pfp_pic" className='w-full' />
                                    </div>
                            }
                        </div>
                    )
                })
            }
        </div>
    )
}

export default BottomNavigation