import React, { useEffect, useState } from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/system';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { addFriend } from '../../../store/slices/user'

const PublicAccountList = () => {
    const { token } = useSelector(state => state.auth);
    const [users, setUsers] = useState([]);
    const dispatch = useDispatch();

    const fetchAllUsers = async (limit = 4) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/all-users/getPublicAccounts?limit=${limit}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setUsers(response.data.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchAllUsers();

        return () => {
            setUsers([]);
        }
    }, []);

    const followHandler = async (friend) => {
        try {
            const response = await axios.put(`${import.meta.env.VITE_BASE_URL}/friends/followFriend`, {
                friendId: friend._id
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            dispatch(addFriend(friend))
            setUsers(prev => {
                const updatedList = prev.filter(user => user._id !== friend._id);
                return updatedList
            })
            toast.success("Friend Followed");
        } catch (error) {
            toast.error(error.message);
            console.log(error);
        }
    }

    return (
        <div>
            <List dense>
                {
                    users.map(user => (
                        <ListItem
                            key={user._id}
                            secondaryAction={
                                <IconButton edge="end" aria-label="delete">
                                    <DeleteIcon />
                                </IconButton>
                            }
                        >
                            <ListItemAvatar>
                                <Avatar>
                                    <FolderIcon />
                                </Avatar>
                            </ListItemAvatar>
                        </ListItem>
                    ))
                }
            </List>
        </div>
    )
}

export default PublicAccountList