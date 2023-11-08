const User = require('../models/User');
const Post = require('../models/Post');
const Like = require('../models/Like');
const Comment = require('../models/Comment');

const { cdupload } = require('../utils/cloudinary')
require('dotenv').config();

exports.createPost = async (req, res) => {
    try {
        const { title, desc } = req.body;
        const { image } = req.files;
        const { id } = req.user;
        if (!title || !desc || !image) {
            throw new Error('All feilds are requiered');
        }
        const uploaded = await cdupload(image, process.env.FOLDER);
        const post = await Post.create({ title: title, desc: desc, image: uploaded, user: id });
        if (!post) {
            throw new Error('uable to create post');
        }
        await User.findByIdAndUpdate(id, { $push: { posts: post._id } });
        res.status(200).json({
            success: true,
            message: 'Post created successfully',
            data: post
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

exports.deletePost = async (req, res) => {
    try {
        const { postId } = req.query;
        const userId = req.user.id;
        const deleted = await Post.findByIdAndDelete(postId);
        await User.findByIdAndUpdate(userId, { $pull: { posts: postId } });
        res.status(200).json({
            success: true,
            message: 'Deleted succesfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'smth went wrong'
        })
    }
}

exports.likePost = async (req, res) => {
    try {
        const { id } = req.user;
        const { postId } = req.body;
        if (!postId) {
            throw new Error('Post id is requiered');
        }
        const likedPost = await Like.create({
            post: postId,
            user: id
        });
        if (!likedPost) {
            throw new Error('unable to like post');
        }
        await Post.findByIdAndUpdate(postId, { $push: { likes: likedPost._id } });
        res.status(200).json({
            success: true,
            message: "post liked successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

exports.unlikePost = async (req, res) => {
    try {
        const { postId } = req.query;
        if (!postId) {
            throw new Error('Post id is requiered');
        }
        const unlikePost = await Like.findByIdAndDelete(postId);
        if (!unlikePost) {
            throw new Error('unable to like post');
        }
        await Post.findByIdAndUpdate(postId, { $pull: { likes: unlikePost._id } });
        res.status(200).json({
            success: true,
            message: 'post unliked successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

exports.commentPost = async (req, res) => {
    try {
        const { postId, comment } = req.body;
        const { id } = req.user;
        if (!postId || !comment) {
            throw new Error('All feilds are requiered');
        }
        const commentPost = await Comment.create({
            post: postId,
            user: id,
            comment
        });
        if (!commentPost) {
            throw new Error('unable to comment post');
        }
        await Post.findByIdAndUpdate(postId, { $push: { comments: commentPost._id } });
        res.status(200).json({
            success: true,
            message: "post commented successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

exports.likedPostByaUser = async (req, res) => {
    try {
        const { id } = req.params;
        const allLikedPost = await Like.find({ user: id }).populate('post').exec();
        if (!allLikedPost) {
            throw new Error('no post liked yet');
        }
        res.status(200).json({
            success: true,
            message: 'fecthed all liked post by the user',
            data: allLikedPost
        })
    } catch (error) {
        res.status(500).json({
            success: true,
            message: error.message
        });
    }
}

exports.getPostComment = async (req, res) => {
    try {
        const { postId } = req.params;
        if (!postId) {
            throw new Error('post Id not found');
        }
        const post = await Post.findById(postId);
        const comments = post.comments;
        res.status(200).json({
            success: true,
            message: 'Comments for a Post fecthed',
            data: comments
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

exports.getPostForUser = async (req, res) => {
    try {
        const { userId } = req.params;
        if (!userId) {
            throw new Error('user id not found');
        }
        const post = await Post.find({ user: userId });
        if (!post) {
            throw new Error('unable to find user posts');
        }
        res.status(200).json({
            success: true,
            message: 'fecthed user posts',
            data: post
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}