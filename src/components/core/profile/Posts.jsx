import React from 'react'
import Post from './Post'

const Posts = ({ user }) => {

    if (!user.posts.length) {
        return <p className='relative text-xl text-center text-white capitalize lg:translate-x-24'>No Post Posted Yet</p>
    }

    return (
        <div className='text-5xl text-white lg:ml-[200px] flex items-center justify-start flex-wrap gap-5 mb-20 lg:mb-0'>
            {
                user.posts.map(post => {
                    return (
                        <Post key={post._id} images={post.images} likes={post.likes.length} comments={post.comments.length} />
                    )
                })
            }
        </div>
    )
}

export default Posts