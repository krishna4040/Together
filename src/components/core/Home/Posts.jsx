import React, { useState } from 'react'
import { AiOutlineComment, AiFillHeart } from 'react-icons/ai'
import { toast } from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination'
import { useAxiosWithAuth } from '../../../utils/axiosInstance'

const Posts = ({ posts, setPosts }) => {
    const user = useSelector(state => state.user)
    const [comment, setComment] = useState('')
    const [comments, setComments] = useState([])
    const [commentSection, setCommentSection] = useState(false)
    const axiosPrivate = useAxiosWithAuth()

    const likeHandler = async (postId) => {
        try {
            const { data } = await axiosPrivate.put('/post/likePost', { postId })
            if (!data.success) {
                throw new Error(data.message);
            }
            setPosts(prev => {
                const updatedPost = prev.filter(post => post._id === postId)
                const remainingPosts = prev.filter(post => post._id !== postId)
                const newLike = data.data
                return [...remainingPosts, {
                    ...updatedPost[0],
                    likes: [
                        ...updatedPost[0].likes,
                        newLike
                    ]
                }]
            })
        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }
    }

    const unlikeHandler = async (postId) => {
        try {
            const { data } = await axiosPrivate.put('/post/unlikePost', { postId })
            if (!data.success) {
                throw new Error(data.message);
            }
            setPosts(prev => {
                const updatedPost = prev.filter(post => post._id === postId)
                const updatedLikes = updatedPost[0].likes.filter(like => like.user === user._id)
                const remainingPosts = prev.filter(post => post._id !== postId)
                return [...remainingPosts, {
                    ...updatedPost[0],
                    likes: updatedLikes
                }]
            })
        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }
    }

    const commentHandler = async (postId) => {
        try {
            const { data } = await axiosPrivate.put('/post/commentPost', { postId, comment })
            if (!data.success) {
                throw new Error(data.message);
            }
            setPosts(prev => {
                const updatedPost = data.data
                const remainingPosts = prev.filter(post => post._id !== postId)
                return [...remainingPosts, { ...updatedPost }]
            })
            fetchPostsComments(postId)
            setComment('')
        } catch (error) {
            console.log(error)
        }
    }

    const fetchPostsComments = async (postId) => {
        try {
            const { data } = await axiosPrivate.get(`/post/getPostComments/${postId}`)
            if (!data.success) {
                throw new Error(data.message)
            }
            setComments(data.data)
        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }
    }

    return (
        <div className='flex flex-col items-center justify-center w-full gap-10 p-4'>
            {
                posts && posts.length ?
                    posts.map((post, index) => {
                        return (
                            post.length !== 0 &&
                            <div key={index} className='flex flex-col justify-center w-full gap-3'>
                                <div className='flex items-center gap-3'>
                                    <div className='w-[50px] h-[50px] rounded-full overflow-hidden flex items-center justify-center p-1 border'>
                                        <img src={post.user.profileDetails.pfp} alt="friend" className='w-full' />
                                    </div>
                                    <h1 className='text-xl text-white capitalize text-red-500'>{post.user.userName}</h1>
                                </div>
                                <div className='relative lg:w-[600px] w-full mx-auto'>
                                    <Swiper
                                        pagination={{
                                            dynamicBullets: true,
                                        }}
                                        modules={[Pagination]}
                                    >
                                        {
                                            post.images.map((image, idx) => (
                                                <SwiperSlide key={idx}>
                                                    <img src={image || ""} alt="post_here" />
                                                </SwiperSlide>
                                            ))
                                        }
                                    </Swiper>
                                </div>
                                <div className='flex items-center gap-3'>
                                    {
                                        post.likes.findIndex(like => like.user === user._id) !== -1 ?
                                            <AiFillHeart onClick={() => unlikeHandler(post._id)} className='text-3xl text-red-600 cursor-pointer hover:scale-95 duration-200 transition-all hover:text-white' /> :
                                            <AiFillHeart onClick={() => likeHandler(post._id)} className='text-3xl text-white cursor-pointer hover:scale-95 duration-200 transition-all hover:text-red-600' />
                                    }
                                    <span className='text-white text-xs'>{post.likes.length}</span>
                                    <AiOutlineComment onClick={() => {
                                        setCommentSection(prev => !prev)
                                        if (commentSection) {
                                            fetchPostsComments(post._id)
                                        }
                                    }} className='text-3xl text-white cursor-pointer' />
                                    <span className='text-white text-xs'>{post.comments.length}</span>
                                    <input type='text' onChange={(e) => setComment(e.target.value)} value={comment} onKeyDown={e => {
                                        if (e.key === 'Enter') {
                                            commentHandler(post._id)
                                        }
                                    }} />
                                </div>
                                <div>
                                    <p className='text-2xl text-white'><span className='text-base text-blue-400'>#caption</span> {post.title}</p>
                                    <p className='text-2xl text-white'><span className='text-base text-blue-400'>#postDesc</span> {post.desc}</p>
                                </div>
                                {
                                    commentSection &&
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
                                }
                            </div>
                        )
                    })
                    :
                    <p className='text-xl text-white italic text-center w-full'>You friends do not share posts, Maybe you are the first</p>
            }
        </div>
    )
}

export default Posts