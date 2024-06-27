import React from 'react'
import { Modal } from '../../ui/Modal'
import { SwiperSlide, Swiper } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

const CommentSection = ({ post, comments, setCommentSection, commentHandler }) => {
    return (
        <Modal outSideCallback={() => setCommentSection(false)}>
            <div className='flex items-center justify-center gap-5'>
                <div className="mx-auto max-w-md overflow-hidden rounded-lg bg-black shadow">
                    <Swiper
                        pagination={{
                            dynamicBullets: true,
                        }}
                        modules={[Pagination]}
                    >
                        {
                            post.images.map((image, idx) => (
                                <SwiperSlide key={idx}>
                                    <img src={image || ""} alt="post_here" className="aspect-video w-full object-cover" />
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                </div>
                <div>
                    {
                        comments.map(comment => (
                            <div className='flex items-center justify-between gap-3' key={comment._id}>
                                <div className='h-[50px] w-[50px] flex items-center justify-center p-1 border rounded-full overflow-hidden hover:scale-110 duration-200 transition-all'>
                                    <img src={comment.user.profileDetails.pfp} alt="user" className='w-full' />
                                </div>
                                <span className='text-white text-xs'>{comment.comment}</span>
                            </div>
                        ))
                    }
                </div>
            </div>
        </Modal>
    )
}

export default CommentSection