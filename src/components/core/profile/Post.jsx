import axios from 'axios';
import React from 'react';
import { FaHeart, FaComment } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux';
import { removePost } from '../../../store/slices/user'
import toast from 'react-hot-toast';

function Post({ title, imageSrc, likes, comments, _id }) {

    const dispacth = useDispatch();
    const { token } = useSelector(state => state.auth);

    const handleDelete = async (_id) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/post/deletePost?postId=${_id}`, {
                postId: _id
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            toast.error("post deleted");
            dispacth(removePost(_id));
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="relative max-w-sm p-4 text-black bg-white rounded-lg shadow-lg">
            {
                _id &&
                <span className="absolute p-2 text-gray-500 cursor-pointer top-3 right-3 hover:text-red-500">
                    <MdDelete onClick={() => { handleDelete(_id) }} className='text-3xl' />
                </span>
            }
            <div>
                <h2 className="mb-2 text-xl font-semibold">{title}</h2>
                <img src={imageSrc} alt={title} className="w-full mb-2 rounded-lg" />
                <div className="flex items-center mb-2">
                    <FaHeart className="mr-2 text-red-500" />
                    <p className="text-gray-700">{likes} Likes</p>
                </div>
                <div className="flex items-center mb-4">
                    <FaComment className="mr-2 text-blue-500" />
                    <p className="text-gray-700">{comments} Comments</p>
                </div>
            </div>
        </div>

    );
}

export default Post;
