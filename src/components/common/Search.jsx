import React, { useEffect, useState } from 'react'
import { BsSearch } from 'react-icons/bs'
import axios from 'axios'

const Search = ({ setSearch }) => {

    const [userName,setUserName] = useState('');

    const fecthUser = async () => {
        try {
            const response = await axios
        } catch (error) {
            
        }
    }

    // useEffect(() => {
    //     fecthUser();
    // },[userName]);

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
                        <input placeholder='Enter Username to search' value={userName} onChange={(event) => {setUserName(event.target.value)}} />
                        <BsSearch/>
                    </div>
                </div>
                <div className="flex gap-3">
                    <button className="flex-1 btn solid danger">Search</button>
                </div>
            </div>
        </div>
    )
}

export default Search