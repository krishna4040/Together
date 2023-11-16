import React from 'react';
import { FaHeart, FaComment } from 'react-icons/fa';

function Post({ title, imageSrc, likes, comments, _id }) {

    return (
        <div className="relative max-w-sm p-4 text-black bg-white rounded-lg shadow-lg">
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
