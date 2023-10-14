import React from 'react'
import { AiFillHome } from 'react-icons/ai'
import { BsFillChatFill, BsFillCameraVideoFill } from 'react-icons/bs'
import { IoSettings } from 'react-icons/io5'
import { BiSolidPhoneCall } from 'react-icons/bi'
import { FiLogOut } from 'react-icons/fi'
import { useLocation, useNavigate } from 'react-router-dom'

const Sidebar = () => {

    const location = useLocation();
    const navigate = useNavigate();
    return (
        <aside className='flex flex-col justify-center gap-2 border bg-gray-950 w-[150px] fixed top-48 left-0 rounded-md p-3'>
            <div className={`flex items-center gap-2 p-1 transition-all duration-200 ${location.pathname === '/' ? 'bg-yellow-950 rounded-md' : ''}`}
                onClick={() => {navigate('/')}}>
                <AiFillHome className='text-3xl text-white' />
                <p className='text-xl text-white'>Home</p>
            </div>
            <div className={`flex items-center gap-2 p-1 transition-all duration-200 ${location.pathname === '/chat' ? 'bg-yellow-950 rounded-md' : ''}`}
                onClick={() => {navigate('/chat')}}>
                <BsFillChatFill className='text-3xl text-white' />
                <p className='text-xl text-white'>Chat</p>
            </div>
            <div className={`flex items-center gap-2 p-1 transition-all duration-200 ${location.pathname === '/audio' ? 'bg-yellow-950 rounded-md' : ''}`}
                onClick={() => {navigate('/audio')}}>
                <BiSolidPhoneCall className='text-3xl text-white' />
                <p className='text-xl text-white'>Audio</p>
            </div>
            <div className={`flex items-center gap-2 p-1 transition-all duration-200 ${location.pathname === '/video' ? 'bg-yellow-950 rounded-md' : ''}`}
                onClick={() => {navigate('/video')}}>
                <BsFillCameraVideoFill className='text-3xl text-white' />
                <p className='text-xl text-white'>Video</p>
            </div>
            <div className={`flex items-center gap-2 p-1 transition-all duration-200 ${location.pathname === '/settings' ? 'bg-yellow-950 rounded-md' : ''}`}
                onClick={() => {navigate('/settings')}}>
                <IoSettings className='text-3xl text-white' />
                <p className='text-xl text-white'>Settings</p>
            </div>
            <div className={`flex items-center gap-2 p-1 transition-all duration-200 ${location.pathname === '/logout' ? 'bg-yellow-950 rounded-md' : ''}`}
                onClick={() => {navigate('/logout')}}>
                <FiLogOut className='text-3xl text-white' />
                <p className='text-xl text-white'>Logout</p>
            </div>
        </aside>
    )
}

export default Sidebar