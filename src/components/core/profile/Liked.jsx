import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Post from './Post'

const Liked = ({ user }) => {

    const [liked, setLiked] = useState([]);

    const fecthLikedPosts = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/post/likedPostByaUser/${user._id}`);
            setLiked(response.data.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fecthLikedPosts();
    }, []);

    if (!liked.length) {
        return <p className='relative text-xl text-center text-white capitalize translate-x-24'>No Post liked Yet</p>
    }

    return (
        <div className='text-5xl text-white ml-[200px]'>
            {
                liked.map(like => {
                    <Post key={like.post._id} title={like.post.title} imageSrc={like.post.image} likes={like.post.likes.length} comments={like.post.comments.length} />
                })
            }
        </div>
    )
}

export default Liked