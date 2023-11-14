import axios from 'axios';
import React from 'react'
import { useSelector } from 'react-redux'

const MyChat = () => {

    const user = useSelector(state => state.user);
    const chat = useSelector(state => state.chat);
    const { token } = useSelector(state => state.auth);

    const fecthChat = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/chat/fecthChat`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>

        </div>
    )
}

export default MyChat