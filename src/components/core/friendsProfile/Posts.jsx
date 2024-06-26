import React, { useEffect, useState } from 'react'
import Post from './Post'
import { useAxiosWithoutAuth } from '../../../utils/axiosInstance';

const Posts = ({ friend }) => {
    const [posts, setPosts] = useState([]);
    const axiosPublic = useAxiosWithoutAuth()

    const fetchFriendPosts = async () => {
        try {
            const response = await axiosPublic.get(`/post/getUserPost/${friend._id}`);
            setPosts(response.data.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchFriendPosts();
    }, []);

    if (!posts.length) {
        return <p className='relative text-xl text-center text-white capitalize lg:translate-x-24'>No Post Posted Yet</p>
    }

    return (
        <div className='text-5xl text-white lg:ml-[200px] flex items-center justify-start flex-wrap gap-5 mb-20 lg:mb-0'>
            {
                posts.map(post => {
                    return (
                        <Post key={post._id} _id={post._id} title={post.title} imageSrc={post.image} likes={post.likes.length} comments={post.comments.length} />
                    )
                })
            }
        </div>
    )
}

export default Posts