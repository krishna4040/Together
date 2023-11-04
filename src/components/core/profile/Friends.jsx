import React from 'react'
import { useNavigate } from 'react-router-dom'

const Friends = ({ user }) => {

    if (!user.friends.length) {
        return <p className='relative text-xl text-center text-white capitalize translate-x-24'>No Friends Yet. Connect Now!</p>
    }

    const navigate = useNavigate();

    return (
        <div className="grid grid-cols-1 gap-4 p-4 text-black sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-items-center">
            {
                user.friends.map((friend, index) => (
                    <div key={index} className="p-4 bg-white rounded-lg shadow">
                        <img
                            src={friend.profileDetails.pfp}
                            alt={friend.userName}
                            className="object-cover w-full h-40 mb-4 rounded-lg"
                        />
                        <p className="text-xl font-semibold">{friend.userName}</p>
                        <button className="px-4 py-2 mt-2 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-700"
                            onClick={() => { navigate(`/view-profile/${friend.userName}`) }}
                        >
                            View Profile
                        </button>
                    </div>
                ))}
        </div>
    )
}

export default Friends