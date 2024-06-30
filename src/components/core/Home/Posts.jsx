import React, { useState } from 'react'
import { AiOutlineComment, AiFillHeart } from 'react-icons/ai'
import { toast } from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination'
import { useAxiosWithAuth } from '../../../hooks/useAxios'
import { Avatar } from '../../ui/Avatar';
import CommentSection from './CommentSection';

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
            toast.error(error.response.data.message)
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
            toast.error(error.response.data.message)
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
            toast.error(error.response.data.message)
            console.log(error)
        }
    }

    return (
        <div className='flex flex-col items-center justify-center w-full gap-10 p-4 overflow-hidden'>
            {
                posts.length ?
                    posts.map((post, index) => {
                        return (
                            post.length !== 0 &&
                            <div className="mx-auto w-full bg-black max-w-md overflow-hidden rounded-lg shadow" key={index}>
                                <div className="header">
                                    <Avatar src={post.user.profileDetails.pfp} h={50} w={50} p={4} border />
                                    <h1 className='text-xl text-white capitalize text-red-500'>{post.user.userName}</h1>
                                </div>
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
                                <div className="p-4">
                                    <div className="mb-1 text-sm text-primary-500 flex items-center justify-start gap-4">
                                        <div className='flex items-center justify-center gap-2'>
                                            {
                                                post.likes.findIndex(like => like.user === user._id) !== -1 ?
                                                    <AiFillHeart onClick={() => unlikeHandler(post._id)} className='text-3xl text-red-600 cursor-pointer hover:scale-95 duration-200 transition-all hover:text-white' /> :
                                                    <AiFillHeart onClick={() => likeHandler(post._id)} className='text-3xl text-white cursor-pointer hover:scale-95 duration-200 transition-all hover:text-red-600' />
                                            }
                                            <span className='text-white text-xs'>{post.likes.length}</span>
                                        </div>
                                        <div className='flex items-center justify-center gap-2'>
                                            <AiOutlineComment onClick={() => {
                                                setCommentSection(prev => !prev)
                                                if (commentSection) {
                                                    fetchPostsComments(post._id)
                                                }
                                            }} className='text-3xl text-white cursor-pointer' />
                                            <span className='text-white text-xs'>{post.comments.length}</span>
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-medium text-blue-900">{post.title}</h3>
                                    <p className="mt-1 text-gray-500">{post.desc}</p>
                                    {
                                        commentSection &&
                                        <CommentSection comments={comments} comment={comment} setComment={setComment} post={post} setCommentSection={setCommentSection} commentHandler={commentHandler} />
                                    }
                                </div>
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