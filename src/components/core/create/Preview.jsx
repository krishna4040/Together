import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AiOutlineHeart, AiOutlineComment } from 'react-icons/ai'
import toast from 'react-hot-toast';
import { addPost } from '../../../store/slices/user'

const Preview = ({ setStep }) => {

    const post = useSelector(state => state.post);
    const user = useSelector(state => state.user);
    const { token } = useSelector(state => state.user);
    const dispatch = useDispatch();

    const clcikHandler = async () => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}createPost`, {
                title: post.title,
                desc: post.caption,
                image: post.image
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.data.success) {
                toast.success("Post uploaded successfully");
                dispatch(addPost(response.data.data));
                setStep("title");
            }
        } catch (error) {
            console.log(error);
            toast.error("Error uploading post");
        }
    }

    const cancelHandler = () => {
        toast.error("Post upload cancelled");
        setStep("title");
    }

    return (
        <div className='flex flex-col justify-center w-[500px] gap-5'>
            {
                Object.keys(user).length &&
                <>
                    <div className='flex items-center gap-3'>
                        <div className='w-[50px] h-[50px] rounded-full overflow-hidden flex items-center justify-center p-2 border'>
                            <img src={user.profileDetails.pfp} alt="friend" className='w-full' />
                        </div>
                        <h1 className='text-xl text-white capitalize'>{user.userName}</h1>
                    </div>
                    <div className='relative lg:w-[400px] w-full mx-auto'>
                        <img src={post.image} alt="post_here" />
                    </div>
                    <div className='flex items-center gap-3'>
                        <AiOutlineHeart className='text-3xl text-white' />
                        <AiOutlineComment className='text-3xl text-white' />
                    </div>
                    <div>
                        <p className='text-2xl text-white'><span className='text-base text-blue-400'>#caption</span> {post.title}</p>
                        <p className='text-2xl text-white'><span className='text-base text-blue-400'>#postDesc</span> {post.caption}</p>
                    </div>
                    <div className='flex items-center justify-start gap-7'>
                        <button className='bn29' onClick={clcikHandler}>Post</button>
                        <button className='bn5' onClick={cancelHandler}>Cancel</button>
                    </div>
                </>
            }
        </div>
    )
}

export default Preview