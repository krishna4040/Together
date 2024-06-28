import React from 'react'
import { AiOutlineHeart } from 'react-icons/ai'
import { IoSearch } from 'react-icons/io5'

const UpperNavigation = ({ setSearch, setNotification, notificationRef }) => {
    return (
        <div className='z-50 fixed top-0 left-0 right-0 flex items-center justify-center gap-8 p-5 bg-black lg:hidden'>
            <div className='w-full flex items-center justify-between px-2 py-1'>
                <h1 className='text-xl text-white'>Together</h1>
                <div className='flex items-center justify-center gap-3'>
                    <button onClick={() => setSearch(true)}>
                        <IoSearch className='text-3xl text-white' />
                    </button>
                    <button onClick={() => setNotification(true)} ref={notificationRef}>
                        <AiOutlineHeart className='text-3xl text-white' />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default UpperNavigation