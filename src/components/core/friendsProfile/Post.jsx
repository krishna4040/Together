import React, { useState } from 'react';
import { FaHeart, FaComment } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';

function Post({ images, likes, comments }) {
    const [show, setShow] = useState(false)

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
                                <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex gap-3'>
                                    <div className='flex items-center justify-center gap-2'>
                                        <FaHeart className='text-white text-xl cursor-pointer hover:scale-95 duration-200 transition-all' />
                                        <span className='text-white text-xs'>{likes}</span>
                                    </div>
                                    <div className='flex items-center justify-center gap-2'>
                                        <FaComment className='text-white text-xl cursor-pointer hover:scale-95 duration-200 transition-all' />
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