import React from 'react';

const Settings = () => {
    const profileData = {
        profilePicture: 'https://via.placeholder.com/150',
        firstName: 'John',
        lastName: 'Doe',
        about: 'Travel enthusiast | Foodie | Photographer',
        friends: [
            {
                id: 1,
                profilePicture: 'https://via.placeholder.com/50',
                firstName: 'Alice',
                lastName: 'Smith',
            },
            {
                id: 2,
                profilePicture: 'https://via.placeholder.com/50',
                firstName: 'Bob',
                lastName: 'Johnson',
            },
            {
                id: 3,
                profilePicture: 'https://via.placeholder.com/50',
                firstName: 'Ella',
                lastName: 'Davis',
            },
        ],
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Navigation */}
            <nav className="py-4 bg-white shadow-md">
                <div className="container flex items-center justify-between mx-auto">
                    <span className="text-xl font-semibold">My Instagram</span>
                    <a href="/logout" className="text-gray-500">Logout</a>
                </div>
            </nav>

            {/* Main Content */}
            <div className="container pt-6 pb-12 mx-auto">
                <div className="grid grid-cols-3 gap-6">
                    {/* Left Sidebar (if needed) */}
                    <div className="col-span-1">
                        {/* You can add a sidebar here if needed */}
                    </div>

                    {/* Profile */}
                    <div className="col-span-2">
                        <div className="p-6 bg-white rounded-lg shadow-md">
                            <div className="flex items-center mb-4">
                                <img src={profileData.profilePicture} alt="Profile" className="w-20 h-20 mr-4 rounded-full" />
                                <div>
                                    <h1 className="text-2xl font-semibold">{profileData.firstName} {profileData.lastName}</h1>
                                    <p className="text-gray-600">{profileData.about}</p>
                                </div>
                            </div>

                            <div className="pt-4 mt-4 border-t border-gray-300">
                                <h2 className="text-lg font-semibold">Friends</h2>
                                <ul className="grid grid-cols-3 gap-4 mt-2">
                                    {profileData.friends.map((friend) => (
                                        <li key={friend.id} className="flex items-center">
                                            <img src={friend.profilePicture} alt={friend.firstName} className="w-12 h-12 mr-2 rounded-full" />
                                            <span>{friend.firstName} {friend.lastName}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Right Sidebar (if needed) */}
                    <div className="col-span-1">
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;