import React from 'react'
import Friends from '../components/core/Home/Friends'
import FriendPostSection from '../components/core/Home/FriendPostSection'
import { useLocation } from 'react-router-dom'

const Home = () => {

    const location = useLocation();

    return (
        <div className='relative bg-black'>
            <div className='w-7/12 p-10 mx-auto overflow-x-auto overflow-y-hidden'>
                <Friends />
            </div>
            <div className='w-7/12 mx-auto'>
                <FriendPostSection />
            </div>
        </div>
    )
}

export default Home