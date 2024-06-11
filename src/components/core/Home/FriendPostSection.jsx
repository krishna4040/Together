import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { AiOutlineHeart, AiOutlineComment } from 'react-icons/ai'
import { useSelector } from 'react-redux';

const FriendPostSection = () => {

    const [posts, setPosts] = useState([]);
    const user = useSelector(state => state.user)
    const { token } = useSelector(state => state.auth)

    const fecthFriendsPosts = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/friends/getFriendsPosts`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setPosts(response.data.data);
        } catch (error) {
            setPosts([]);
            console.log(error)
        }
    }

    useEffect(() => {
        fecthFriendsPosts();
    }, [user.friends.length]);

    return (
        <div className='flex flex-col items-center justify-center w-full gap-10 p-4'>
            {
                posts.length ?
                    posts.map((post, index) => {
                        return (
                            post.length !== 0 &&
                            <div key={index} className='flex flex-col justify-center w-full gap-3'>
                                <div className='flex items-center gap-3'>
                                    <div className='w-[50px] h-[50px] rounded-full overflow-hidden flex items-center justify-center p-1 border'>
                                        <img src={post.user.profileDetails.pfp} alt="friend" className='w-full' />
                                    </div>
                                    <h1 className='text-xl text-white capitalize'>{post.user.userName}</h1>
                                </div>
                                <div className='relative lg:w-[600px] w-full mx-auto'>
                                    <img src={post.image || ""} alt="post_here" />
                                </div>
                                <div className='flex items-center gap-3'>
                                    <AiOutlineHeart className='text-3xl text-white' />
                                    <AiOutlineComment className='text-3xl text-white' />
                                </div>
                                <div>
                                    <p className='text-2xl text-white'><span className='text-base text-blue-400'>#caption</span> {post.title}</p>
                                    <p className='text-2xl text-white'><span className='text-base text-blue-400'>#postDesc</span> {post.desc}</p>
                                </div>
                            </div>
                        )
                    })
                    :
                    <p className='text-xl text-white italic text-center w-full'>You Do Not Have Friends. Make One</p>
            }
        </div>
    )
}

export default FriendPostSection