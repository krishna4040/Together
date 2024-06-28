import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import * as _ from 'lodash'
import { useAxiosWithAuth } from '../../hooks/useAxios';
import { Drawer, InputAdornment, TextField } from '@mui/material';
import UserListItems from '../core/chat/utils/UserListItems';
import { useClickOutside } from '../../hooks/useClickOutside';
import { IoSearch } from "react-icons/io5";

const Search = ({ search, setSearch }) => {
    const [userName, setUserName] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const navigate = useNavigate();
    const axiosPrivate = useAxiosWithAuth()

    const ref = useRef(null)

    useClickOutside(ref, () => setSearch(false))

    const fetchSuggestions = async (key) => {
        try {
            const { data } = await axiosPrivate.get(`/all-users/suggestion?q=${key}`);
            setSuggestions(data.data);
        } catch (error) {
            toast.error("unable to fetch suggestions");
            console.log(error);
        }
    };

    const debouncedFetch = _.debounce(fetchSuggestions, 500);

    useEffect(() => {
        if (userName) {
            debouncedFetch(userName);
        }
        return () => {
            debouncedFetch.cancel();
        };
    }, [userName, debouncedFetch]);

    const visitHandler = (userName) => {
        setSearch(false)
        navigate(`/view-profile/${userName}`);
    }

    return (
        <Drawer anchor='right' open={search} elevation>
            <div className='px-2 min-w-[320px]  py-3 h-screen bg-white' ref={ref}>
                <h2 className="text-2xl text-black font-semibold">Search</h2>
                <div className='flex items-center gap-1 mt-5'>
                    <div className='is-divider' />
                    <TextField
                        placeholder='Enter Username to search'
                        value={userName}
                        onChange={e => setUserName(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <IoSearch />
                                </InputAdornment>
                            ),
                        }}
                        color='success'
                        variant='filled'
                        size='small'
                        fullWidth
                    />
                </div>
                <div className='flex flex-col items-start justify-start gap-3 p-2 overflow-x-hidden overflow-y-auto h-fit'>
                    {
                        suggestions.map(user => {
                            return <UserListItems key={user._id} user={user} handleFunction={() => visitHandler(user.userName)} />
                        })
                    }
                </div>
            </div>
        </Drawer>
    )
}

export default Search
