import React from 'react'
import Friends from '../components/core/Home/Friends'
import FriendPostSection from '../components/core/Home/FriendPostSection'
import AllUsers from '../components/core/Home/AllUsers'
import { useLocation } from 'react-router-dom'

const Home = () => {

    return (
        <div className='relative flex justify-center bg-black'>
            <div className='flex flex-col justify-center gap-16 p-10 ml-60 w-[800px]'>
                <Friends />
                <FriendPostSection />
            </div>
            <div>
                <AllUsers />
            </div>
        </div>
    )
}

export default Home