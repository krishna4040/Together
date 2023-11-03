import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast';
import { AiOutlineHeart, AiTwotoneHeart, AiOutlineComment } from 'react-icons/ai'

const FriendPostSection = () => {

    const { token } = useSelector(state => state.auth);

    const [posts, setPosts] = useState([]);

    const fecthFriendsPosts = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/getFriendPost`, { headers: { Authorization: `Bearer ${token}` } });
            setPosts(response.data.data);
        } catch (error) {
            console.log(error);
            toast.error('unable to fecth friends posts');
        }
    }

    useEffect(() => {
        fecthFriendsPosts();
    }, []);

    return (
        <div className='flex flex-col items-center justify-center w-full gap-10'>
            {
                posts.map((post, index) => {
                    return (
                        post.length !== 0 &&
                        <div key={index} className='flex flex-col justify-center w-full gap-3'>
                            <div className='flex items-center gap-3'>
                                <div className='w-[50px] h-[50px] rounded-full overflow-hidden flex items-center justify-center p-1 border'>
                                    <img src={post[0].user.profileDetails.pfp} alt="friend" className='w-full' />
                                </div>
                                <h1 className='text-xl text-white capitalize'>{post[0].user.userName}</h1>
                            </div>
                            <div className='relative lg:w-[600px] w-full mx-auto'>
                                <img src={post[0].image} alt="post_here" />
                            </div>
                            <div className='flex items-center gap-3'>
                                <AiOutlineHeart className='text-3xl text-white' />
                                <AiOutlineComment className='text-3xl text-white' />
                            </div>
                            <div>
                                <p className='text-2xl text-white'><span className='text-base text-blue-400'>#caption</span> {post[0].title}</p>
                                <p className='text-2xl text-white'><span className='text-base text-blue-400'>#postDesc</span> {post[0].desc}</p>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default FriendPostSection