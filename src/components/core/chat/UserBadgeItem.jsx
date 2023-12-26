import React from 'react'
import { IoMdClose } from "react-icons/io";

const UserBadgeItem = ({ user, handleFunction }) => {
    return (
        <div className='flex items-center px-2 py-1 m-1 mb-2 overflow-hidden text-yellow-200 bg-purple-700 rounded-lg cursor-pointer text-ellipsis' onClick={handleFunction}>
            {user.userName}
            <IoMdClose className='pl-1 text-black' />
        </div>
    )
}

export default UserBadgeItem