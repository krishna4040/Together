import React from 'react'
import { useSelector } from 'react-redux';

const Friends = () => {

    const user = useSelector(state => state.user);

    return (
        user.email &&
        <div className='lg:w-[600px] w-full overflow-x-auto overflow-y-hidden border-b lg:border-r rounded-md lg:relative lg:-top-2'>
            <div className='flex items-center justify-start h-24 gap-5 flex-nowrap lg:p-4 min-w-max'>
                {
                    user.friends.map((friend, index) => {
                        return (
                            <div key={index} className='h-[80px] w-[80px] flex items-center justify-center p-1 border rounded-full overflow-hidden hover:scale-110 duration-200 transition-all'>
                                <img src={friend?.profileDetails?.pfp} alt="friend" className='w-full' />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Friends