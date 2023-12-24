import React from 'react'

const UserListItems = ({ handleFunction, user }) => {

    return (
        <div onClick={handleFunction} className='cursor-pointer bg-[#e8e8e8] hover:bg-[#38b2ac] hover:text-white w-full flex items-center text-black px-3 py-2 mb-2 rounded-lg'>
            <div className='avatar'>
                <img alt='avatar' src={user.pfp} />
            </div>
            <div>
                <p>{user.userName}</p>
                <p className='text-xs'>
                    <b>Email: </b>
                    {user.email}
                </p>
            </div>
        </div>
    )
}

export default UserListItems