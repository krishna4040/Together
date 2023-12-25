import React from 'react'

const UserBadgeItem = ({ user, handleFunction }) => {
    return (
        <div className='px-2 py-1 m-1 mb-2 bg-purple-900 rounded-lg cursor-pointer' onClick={handleFunction}>
            {user.userName}
        </div>
    )
}

export default UserBadgeItem