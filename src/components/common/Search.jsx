import React, { useEffect, useState } from 'react'
import { BsSearch } from 'react-icons/bs'
import axios from 'axios'

const Search = ({ setSearch }) => {

    const [userName, setUserName] = useState('');
    const [user, setUser] = useState([]);

    const fecthUser = async () => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/searchByUsername`, { userName });
            setUser(response.data.data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <label className="modal-overlay"></label>
            <div className="flex flex-col gap-5 modal show pause-scroll">
                <button className="absolute right-4 top-3" onClick={() => { setSearch(false) }}>✕</button>
                <h2 className="text-xl">Search</h2>
                <div className='grid gap-4'>
                    <div className='input success solid'>
                        <div>
                            Username
                        </div>
                        <div className='is-divider' />
                        <input placeholder='Enter Username to search' value={userName} onChange={(event) => { setUserName(event.target.value) }} />
                        <BsSearch />
                    </div>
                </div>
                {
                    user.length ?
                    <div className='flex items-center gap-5'>
                        <div className='w-[50px] h-[50px] rounded-full overflow-hidden'>
                            <img src={user[0].profileDetails.pfp} alt="user_image" className='w-full' />
                        </div>
                        <p className='min-w-[55px] text-lg capitalize'>{user[0].userName}</p>
                        <button className='btn outline success'>Connect</button>
                    </div>
                    :
                    null
                }
                <div className="flex gap-3">
                    <button className="flex-1 btn solid danger" onClick={() => {fecthUser()}}>Search</button>
                </div>
            </div>
        </div>
    )
}

export default Search