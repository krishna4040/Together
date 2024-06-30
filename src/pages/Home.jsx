import React from 'react'
import Friends from '../components/core/Home/Friends'
import PersonalizedFeed from '../components/core/Home/PersonalizedFeed'
import PublicAccountList from '../components/core/Home/PublicAccounts'

const Home = () => {
    return (
        <div className='relative flex justify-start w-full min-h-screen mb-20 bg-black lg:mb-0 mt-16 lg:mt-0'>
            <div className='flex flex-col justify-start gap-10 lg:gap-16 lg:p-10 p-3 lg:ml-60 lg:w-[800px] w-full'>
                <Friends />
                <PersonalizedFeed />
            </div>
            <div className='w-[320px] hidden overflow-y-auto md:hidden lg:fixed lg:block lg:top-20 lg:right-10 max-h-[550px]'>
                <div className='flex items-center justify-between text-white mb-2'>
                    <p>suggested for you</p>
                    <span>see all</span>
                </div>
                <PublicAccountList />
            </div>
        </div>
    )
}

export default Home