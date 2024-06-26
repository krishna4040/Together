import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useAxiosWithAuth } from '../../../hooks/useAxios'

const Mutuals = ({ userId }) => {
    const [mutuals, setMutuals] = useState([])
    const axiosPrivate = useAxiosWithAuth()

    const fetchMutualFriends = async () => {
        try {
            const { data } = await axiosPrivate.get(`/friends/getMutualFriends?userId=${userId}`)
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