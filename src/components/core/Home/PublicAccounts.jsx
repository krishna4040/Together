import React, { useEffect, useState } from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { addFriend } from '../../../store/slices/user'
import { ListItemText } from '@mui/material';
import { useAxiosWithAuth } from '../../../hooks/useAxios';
import { InfoButton } from '../../ui/Button';

const PublicAccountList = () => {
    const [users, setUsers] = useState([]);
    const dispatch = useDispatch();

    const axiosPrivate = useAxiosWithAuth()

    const fetchPublicUsers = async (limit = 4) => {
        try {
            const { data } = await axiosPrivate.get(`/all-users/getPublicAccounts?limit=${limit}`)
            setUsers(data.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchPublicUsers();

        return () => {
            setUsers([]);
        }
    }, []);

    const followHandler = async (friend) => {
        try {
            const { data } = await axiosPrivate.put('/friends/followFriend', { friendId: friend._id })
            if (!data.success) {
                throw new Error(response.data.message);
            }
            dispatch(addFriend(friend))
            setUsers(prev => {
                const updatedList = prev.filter(user => user._id !== friend._id);
                return updatedList
            })
            setUsers(prev => {
                const updatedList = prev.filter(user => user._id !== friend._id);
                return updatedList
            })
            toast.success("Friend Followed");
        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error);
        }
    }

    return (
        users.length ?
            <List dense sx={{
                backgroundColor: '#737373',
                width: '100%'
            }}>
                {
                    users.map(user => (
                        <ListItem
                            dense
                            key={user._id}
                            secondaryAction={
                                <InfoButton onClick={() => followHandler(user)} text="Follow" />
                            }
                        >
                            <ListItemAvatar>
                                <Avatar src={user.profileDetails.pfp} alt='pfp' />
                            </ListItemAvatar>
                            <ListItemText
                                primary={user.userName}
                                secondary="suggested for you"
                            />
                        </ListItem>
                    ))
                }
            </List>
            :
            <></>
    )
}

export default PublicAccountList