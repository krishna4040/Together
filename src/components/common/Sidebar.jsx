import React from 'react'
import { AiFillHome, AiOutlineHeart } from 'react-icons/ai'
import { IoSettings, IoCreateOutline } from 'react-icons/io5'
import { BiMessageSquareDots, BiSearch } from 'react-icons/bi'
import { FiLogOut } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Avatar } from '../ui/Avatar'

const Sidebar = ({ setLogout, setSearch, setNotification, notificationRef }) => {
    const user = useSelector(state => state.user);

    const arr = [
        { title: 'Home', icon: AiFillHome, link: '/home' },
        { title: 'Search', icon: BiSearch, clickHandler: setSearch },
        { title: 'Messages', icon: BiMessageSquareDots, link: '/messages' },
        { title: 'Notification', icon: AiOutlineHeart, clickHandler: setNotification },
        { title: 'Create', icon: IoCreateOutline, link: '/create' },
        { title: 'Profile', icon: AiFillHome, link: '/profile' },
        { title: 'Settings', icon: IoSettings, link: '/edit-profile' },
        { title: 'Logout', icon: FiLogOut, clickHandler: setLogout },
    ];

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
                                    <Avatar src={user.profileDetails.pfp} h={48} w={48} p={8} border />
                            }
                            <p ref={el => {
                                if (item.title === 'Notification') {
                                    notificationRef.current = el
                                }
                            }} className='text-xl text-white'>{item.title}</p>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Sidebar