import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import toast from 'react-hot-toast';
import { acceptFriendRequest, rejectFriendRequest } from '../../store/slices/user';
import { useAxiosWithAuth } from '../../hooks/useAxios';
import { Avatar } from '../ui/Avatar';
import { PopOver } from '../ui/Popover';
import { IconButton, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText } from '@mui/material';
import { useClickOutside } from '../../hooks/useClickOutside';
import { makeStyles } from 'tss-react/mui';

const Notifications = ({ notification, setNotification, notificationRef }) => {
    const [notices, setNotices] = useState({})
    const dispatch = useDispatch();
    const axiosPrivate = useAxiosWithAuth();
    const ref = useRef(null)
    const [loading, setLoading] = useState(false)

    const ListItemWithWiderSecondaryAction = makeStyles({
        secondaryAction: {
            paddingRight: 96
        }
    })(ListItem);

    useClickOutside(ref, () => setNotification(false))

    const fetchNotifications = async () => {
        try {
            setLoading(true)
            const { data } = await axiosPrivate.get('/notifications/fetchNotifications')
            setNotices(data.data)
            setLoading(false)
        } catch (error) {
            console.log(error)
        }
    }

    const acceptRequestHandler = async (friend, date) => {
        try {
            const { data } = await axiosPrivate.put('/friends/acceptFriendRequest', { friendId: friend._id })
            if (!data.success) {
                throw new Error(data.message)
            }
            dispatch(acceptFriendRequest(friend))
            setNotices(prev => {
                return {
                    ...prev,
                    [date]: prev[date].filter(notification => notification.by._id !== friend._id)
                }
            })
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }
    }

    const rejectRequestHandler = async (friend, date) => {
        try {
            const { data } = await axiosPrivate.put('/friends/rejectFriendRequest', { friendId: friend._id })
            if (!data.success) {
                throw new Error(data.message)
            }
            dispatch(rejectFriendRequest(friend._id))
            setNotices(prev => {
                return {
                    ...prev,
                    [date]: prev[date].filter(notification => notification.by._id !== friend._id)
                }
            })
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }
    }

    useEffect(() => {
        fetchNotifications()

        return () => {
            setNotices({})
        }
    }, [])

    return (
        <PopOver open={notification} anchorRef={notificationRef}>
            {
                loading ?
                    <div className='min-w-[300px] px-4 py-2 flex flex-col items-center w-full border'>Loading...</div>
                    :
                    <div className='min-w-[300px] px-4 py-2 flex flex-col items-center w-full border' ref={ref}>
                        <div>
                            {
                                Object.keys(notices).length > 0 ?
                                    Object.entries(notices).map(([date, notifications]) => {
                                        return <div key={date}>
                                            <span>{date}</span>
                                            <List dense>
                                                {
                                                    notifications.map(notification => (
                                                        <ListItem
                                                            dense
                                                            key={notification._id}
                                                            divider
                                                        >
                                                            <ListItemAvatar>
                                                                <Avatar src={notification.by.profileDetails.pfp} h={50} w={50} />
                                                            </ListItemAvatar>
                                                            <ListItemText
                                                                sx={{
                                                                    width: '200px'
                                                                }}
                                                                primary={notification.content}
                                                                secondary={notification.createdAt.time}
                                                            />
                                                            <ListItemSecondaryAction>
                                                                {
                                                                    notification.notificationType === 'action' &&
                                                                    <>
                                                                        <IconButton onClick={() => acceptRequestHandler(notification.by, notification.createdAt.date)}>
                                                                            <FaCheck className='text-xl hover:text-green-400 hover:scale-110 duration-200 transition-all' />
                                                                        </IconButton>
                                                                        <IconButton onClick={() => rejectRequestHandler(notification.by, notification.createdAt.date)}>
                                                                            <ImCross className='text-xl hover:text-red-600 hover:scale-110 duration-200 transition-all' />
                                                                        </IconButton>
                                                                    </>
                                                                }
                                                            </ListItemSecondaryAction>
                                                        </ListItem>
                                                    ))
                                                }
                                            </List>
                                        </div>
                                    }) :
                                    <p className='text-black'>No notifications</p>
                            }
                        </div>
                    </div>
            }
        </PopOver>
    )
}

export default Notifications