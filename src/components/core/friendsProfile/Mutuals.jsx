import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'

const Mutuals = ({ userId }) => {
    const { token } = useSelector(state => state.auth)
    const [mutuals, setMutuals] = useState([])

    const fetchMutualFriends = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/friends/getMutualFriends?userId=${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (!data.success) {
                throw new Error('unable to fetch mutuals')
            }
            setMutuals(data.data)
        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }
    }

    useEffect(() => {
        fetchMutualFriends()
    }, [userId])

    return <p>{mutuals.length} Mutuals</p>
}

export default Mutuals