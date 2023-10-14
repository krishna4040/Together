import React from 'react'
import Sidebar from '../components/common/Sidebar'
import { Outlet } from 'react-router-dom'

const Home = () => {
    return (
        <div className='relative'>
            <Sidebar />
            <Outlet />
        </div>
    )
}

export default Home