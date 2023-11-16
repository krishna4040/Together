import React from 'react'
import Post from './Post'

const Posts = ({ friend }) => {

    if (!friend.posts.length) {
        return <p className='relative text-xl text-center text-white capitalize translate-x-24'>No Post Posted Yet</p>
    }

    return (
        <div className='text-5xl text-white ml-[200px] flex items-center justify-start flex-wrap gap-5'>
            {
                friends.posts.map(post => {
                    return (
                        <Post key={post._id} _id={post._id} title={post.title} imageSrc={post.image} likes={post.likes.length} comments={post.comments.length} />
                    )
                })
            }
        </div>
    )
}

export default Posts