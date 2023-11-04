import React from 'react'
import Friends from '../components/core/Home/Friends'
import FriendPostSection from '../components/core/Home/FriendPostSection'
import AllUsers from '../components/core/Home/AllUsers'

const Home = () => {

    return (
        <div className='relative flex justify-center w-full min-h-screen mb-20 bg-black lg:mb-0'>
            <div className='flex flex-col justify-start gap-10 lg:gap-16 lg:p-10 p-3 lg:ml-60 lg:w-[800px] w-full'>
                <Friends />
                <FriendPostSection />
            </div>
            <div className='hidden lg:block'>
                <AllUsers />
            </div>
        </div>
    )
}

export default Home