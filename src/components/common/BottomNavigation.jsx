import React from 'react'
import { useSelector } from 'react-redux'
import { AiFillHome } from 'react-icons/ai'
import { IoCreateOutline } from 'react-icons/io5'
import { BiMessageSquareDots, BiSearch } from 'react-icons/bi'
import { FiLogOut } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { Avatar } from '../ui/Avatar'

const BottomNavigation = ({ setSearch, setLogout }) => {

    const arr = [
        { title: 'Home', icon: AiFillHome, link: '/' },
        { title: 'Search', icon: BiSearch, clickHandler: setSearch },
        { title: 'Messages', icon: BiMessageSquareDots, link: '/messages' },
        { title: 'Create', icon: IoCreateOutline, link: '/create' },
        { title: 'Profile', icon: AiFillHome, link: '/profile' },
        { title: 'Logout', icon: FiLogOut, clickHandler: setLogout },
    ];

    const navigate = useNavigate();
    const user = useSelector(state => state.user);

    return (
        <div className='fixed bottom-0 left-0 right-0 flex items-center justify-center gap-8 p-5 bg-black lg:hidden'>
            {
                arr.map((item, index) => {
                    return (
                        <div key={index} onClick={() => { item.link ? navigate(item.link) : item.clickHandler(true) }}>
                            {
                                item.title !== 'Profile' ? <item.icon className='text-3xl text-white' />
                                    :
                                    <Avatar src={user.profileDetails.pfp} w={48} h={48} />
                            }
                        </div>
                    )
                })
            }
        </div>
    )
}

export default BottomNavigation