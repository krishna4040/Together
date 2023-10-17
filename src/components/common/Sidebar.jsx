import React from 'react'
import { AiFillHome , AiOutlineHeart } from 'react-icons/ai'
import { IoSettings , IoCreateOutline } from 'react-icons/io5'
import { BiMessageSquareDots,BiSearch } from 'react-icons/bi'
import { FiLogOut } from 'react-icons/fi'
import { useLocation, useNavigate } from 'react-router-dom'

const arr = [
    {title: 'Home' , icon: AiFillHome , link: '/'},
    {title: 'Search' , icon: BiSearch , link: '/search'},
    {title: 'Messages' , icon: BiMessageSquareDots , link: '/chat'},
    {title: 'Notification' , icon: AiOutlineHeart , link: '/notifications'},
    {title: 'Create' , icon: IoCreateOutline , link: '/create'},
    {title: 'Profile' , icon: AiFillHome , link: '/profile'},
    {title: 'Settings' , icon: IoSettings , link: '/settings'},
    {title: 'Logout' , icon: FiLogOut , link: '/logout'},
]

const Sidebar = () => {

    const location = useLocation();
    const navigate = useNavigate();
    return (
        <div className='flex flex-col justify-center gap-7 bg-black w-[200px] fixed top-0 left-0 p-3 h-screen border-r border-gray-500'>
            <h1 className='text-2xl text-white'>Togethr</h1>
            {
                arr.map((item,index) => {
                    return(
                        <div className='flex items-center gap-3 p-2 transition-all duration-200 rounded-md hover:bg-gray-400 hover:scale-110' key={index} onClick={() => {navigate(item.link)}}>
                            <item.icon className='text-xl text-white'/>
                            <p className='text-xl text-white'>{item.title}</p>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Sidebar