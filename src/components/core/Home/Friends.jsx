import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Avatar } from '../../ui/Avatar';

const Friends = () => {

    const [friends, setFriends] = useState([])
    const user = useSelector(state => state.user)

    useEffect(() => {
        setFriends(user.friends)
    }, [user.friends.length])

    return (
        friends.length &&
        <div className='lg:w-[600px] w-full overflow-x-auto overflow-y-hidden border-b lg:border-r rounded-md lg:relative lg:-top-2'>
            <div className='flex items-center justify-start h-24 gap-5 flex-nowrap lg:p-4 min-w-max'>
                {
                    friends.map((friend, index) => <Avatar key={index} src={friend?.profileDetails?.pfp} h={80} w={80} />)
                }
            </div>
        </div>
    )
}

export default Friends