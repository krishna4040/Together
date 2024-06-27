import React, { useState } from 'react';
import { FaHeart, FaComment } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md'
import { useDispatch } from 'react-redux';
import { removePost } from '../../../store/slices/user'
import toast from 'react-hot-toast';
import { useAxiosWithAuth } from '../../../hooks/useAxios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';

function Post({ images, likes, comments }) {
    const dispatch = useDispatch();
    const axiosPrivate = useAxiosWithAuth()
    const [show, setShow] = useState(false)

    const handleDelete = async (_id) => {
        try {
            const { data } = await axiosPrivate.delete(`/post/deletePost?postId=${_id}`)
            if (!data.success) {
                throw new Error('could not delete post')
            }
            toast.error("post deleted");
            dispatch(removePost(_id));
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="mx-auto w-full relative bg-black max-w-md overflow-hidden rounded-lg shadow hover-area"
            onMouseEnter={() => setShow(true)}
            onMouseLeave={() => setShow(false)}
        >
            <Swiper
                pagination={{
                    dynamicBullets: true,
                }}
                modules={[Pagination]}
            >
                {
                    images.map((image, idx) => (
                        <SwiperSlide key={idx}>
                            <img
                                src={image || ""}
                                alt="post_here"
                                className="aspect-video w-full object-cover"
                            />
                            <div className={`transition-all duration-500 ${show ? 'opacity-100' : 'opacity-0'}`}>
                                <MdDelete className='absolute top-2 right-1 text-3xl  hover:text-red-700 hover:scale-90 transition-all duration-200' onClick={handleDelete} />
                                <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex gap-3'>
                                    <div className='flex items-center justify-center gap-2'>
                                        <FaHeart className='text-white text-xl cursor-pointer hover:scale-95 duration-200 transition-all' />
                                        <span className='text-white text-xs'>{likes}</span>
                                    </div>
                                    <div className='flex items-center justify-center gap-2'>
                                        <FaComment className='text-white text-xl cursor-pointer hover:scale-95 duration-200 transition-all'/>
                                        <span className='text-white text-xs'>{comments}</span>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    );
}

export default Post;
