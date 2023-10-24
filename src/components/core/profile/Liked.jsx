import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux';
import Post from './Post'

const Liked = ({ user }) => {

    const [posts, setPosts] = useState([]);
    const { token } = useSelector(state => state.user);

    const fecthLikedPosts = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/allLikedPost`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setPosts(response.data.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fecthLikedPosts();
    },[]);

    if (!posts.length) {
        return <p className='relative text-xl text-center text-white capitalize translate-x-24'>No Post liked Yet</p>
    }

    return (
        <div className='text-5xl text-white ml-[200px]'>
            {
                posts.map(post => {
                    <Post key={post._id} title={post.title} imageSrc={post.image} likes={post.likes.length} comments={post.comments.length} />
                })
            }
        </div>
    )
}

export default Liked