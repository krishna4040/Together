import axios from 'axios';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AiOutlineHeart, AiOutlineComment } from 'react-icons/ai'
import toast from 'react-hot-toast';
import { addPost } from '../../../store/slices/user'
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination'
import { Swiper, SwiperSlide } from 'swiper/react';
import { ErrorButton, InfoButton } from '../../ui/Button';
import { Avatar } from '../../ui/Avatar';

const Preview = ({ setStep }) => {
    const post = useSelector(state => state.post);
    const user = useSelector(state => state.user);
    const { token } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const uploadHandler = async () => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/post/createPost`, {
                title: post.title,
                desc: post.caption,
                images: post.uploadImages
            }, {
                headers: {
                    "Content-Type": 'multipart/form-data',
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
        <div className='flex flex-col justify-center lg:w-[500px] w-full gap-5'>
            <div className='flex items-center gap-3'>
                <Avatar w={50} h={50} p={8} border src={user.profileDetails.pfp} />
                <h1 className='text-xl text-white capitalize'>{user.userName}</h1>
            </div>
            <div className='relative lg:w-[400px] w-full mx-auto'>
                <Swiper
                    pagination={{
                        dynamicBullets: true,
                    }}
                    modules={[Pagination]}
                    autoplay
                >
                    {
                        post.displayImages.length &&
                        displayImages.map((image, index) => (
                            <SwiperSlide key={index}>
                                <img src={image} alt="preview_image" width={300} height={300} />
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
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
                <InfoButton text="Info" onClick={uploadHandler} />
                <ErrorButton text="Cancel" onClick={cancelHandler} />
            </div>
        </div>
    )
}

export default Preview