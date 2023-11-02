import React, { useEffect, useState } from 'react'
import { AiFillHome, AiOutlineHeart } from 'react-icons/ai'
import { IoSettings, IoCreateOutline } from 'react-icons/io5'
import { BiMessageSquareDots, BiSearch } from 'react-icons/bi'
import { FiLogOut } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useSelector } from 'react-redux'

const Sidebar = ({ setLogout, setSearch, setNotifications }) => {

    const arr = [
        { title: 'Home', icon: AiFillHome, link: '/' },
        { title: 'Search', icon: BiSearch, clickHandler: setSearch },
        { title: 'Messages', icon: BiMessageSquareDots, link: '/chat' },
        { title: 'Notification', icon: AiOutlineHeart, clickHandler: setNotifications },
        { title: 'Create', icon: IoCreateOutline, link: '/create' },
        { title: 'Profile', icon: AiFillHome, link: '/profile' },
        { title: 'Settings', icon: IoSettings, link: '/edit-profile' },
        { title: 'Logout', icon: FiLogOut, clickHandler: setLogout },
    ];

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
    }, [])

    const navigate = useNavigate();
    return (
        <div className='lg:flex flex-col hidden justify-center gap-7 bg-black w-[200px] fixed top-0 left-0 p-3 h-screen border-r border-gray-500'>
            <h1 className='text-2xl text-white'>Together</h1>
            {
                arr.map((item, index) => {
                    return (
                        <div className='flex items-center gap-3 p-2 transition-all duration-200 rounded-md cursor-pointer hover:bg-gray-400 hover:scale-110' key={index} onClick={() => { item.link ? navigate(item.link) : item.clickHandler(true) }}>
                            {
                                item.title !== 'Profile' ? <item.icon className='text-xl text-white' />
                                    :
                                    <div className='flex items-center justify-center w-12 h-12 p-2 overflow-hidden border rounded-full'>
                                        <img src={pfp} alt="pfp_pic" className='w-full' />
                                    </div>
                            }
                            <p className='text-xl text-white'>{item.title}</p>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Sidebar