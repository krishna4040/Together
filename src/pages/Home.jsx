import React from 'react'
import Sidebar from '../components/common/Sidebar'
import Friends from '../components/core/Home/Friends'
import { Outlet } from 'react-router-dom'

const Home = () => {
    return (
        <div className='relative bg-black'>
            <Friends />
            <Sidebar />
            <div className='w-7/12 mx-auto border'>
                <Outlet />
            </div>
        </div>
    )
}

export default Home