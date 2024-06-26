import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import toast from 'react-hot-toast';
import { acceptFriendRequest, rejectFriendRequest } from '../../store/slices/user';
import { Modal } from '../ui/Modal';
import { useAxiosWithAuth } from '../../utils/axiosInstance';

const Notifications = ({ setNotification }) => {
    const [notices, setNotices] = useState({})
    const dispatch = useDispatch();
    const axiosPrivate = useAxiosWithAuth();

    const fetchNotifications = async () => {
        try {
            const { data } = await axiosPrivate.get('/notifications/fetchNotifications')
            setNotices(data.data)
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
            toast.error(error.message)
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
            toast.error(error.message)
        }
    }

    useEffect(() => {
        fetchNotifications()

        return () => {
            setNotices({})
        }
    }, [])

    return (
        <Modal>
            <button onClick={() => setNotification(false)}>Close</button>
            {
                Object.keys(notices).length > 0 ?
                    Object.entries(notices).map(([date, notifications]) => {
                        return <div key={date}>
                            <span>{date}</span>
                            <div>
                                {
                                    notifications.map(notification => (
                                        <div className='flex items-center justify-between gap-3' key={notification._id}>
                                            <div className='h-[50px] w-[50px] flex items-center justify-center p-1 border rounded-full overflow-hidden hover:scale-110 duration-200 transition-all'>
                                                <img src={notification.by.profileDetails.pfp} alt="user" className='w-full' />
                                            </div>
                                            <span>{notification.content}</span>
                                            <span>{notification.createdAt.time}</span>
                                            {
                                                notification.notificationType === 'action' &&
                                                <div className='flex gap-3 items-center justify-center'>
                                                    <FaCheck onClick={() => acceptRequestHandler(notification.by, notification.createdAt.date)} className='text-xl hover:text-green-400 hover:scale-110 duration-200 transition-all' />
                                                    <ImCross onClick={() => rejectRequestHandler(notification.by, notification.createdAt.date)} className='text-xl hover:text-red-600 hover:scale-110 duration-200 transition-all' />
                                                </div>
                                            }
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    }) :
                    <p className='text-black'>No notifications</p>
            }
        </Modal>
    )
}

export default Notifications