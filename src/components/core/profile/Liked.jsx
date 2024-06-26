import React, { useEffect, useState } from 'react'
import Post from './Post'
import { useAxiosWithoutAuth } from '../../../hooks/useAxios';

const Liked = ({ user }) => {
    const [liked, setLiked] = useState([]);
    const axiosPublic = useAxiosWithoutAuth()

    const fetchLikedPosts = async () => {
        try {
            const response = await axiosPublic.get(`/post/likedPostByaUser/${user._id}`);
            setLiked(response.data.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchLikedPosts();
    }, []);

    if (!liked.length) {
        return <p className='relative text-xl text-center text-white capitalize lg:translate-x-24'>No Post liked Yet</p>
    }

    return (
        <div className='text-5xl text-white lg:ml-[200px] mb-20 lg:mb-0'>
            {
                liked.map(like => {
                    <Post key={like.post._id} title={like.post.title} imageSrc={like.post.image} likes={like.post.likes.length} comments={like.post.comments.length} />
                })
            }
        </div>
    )
}

export default Liked