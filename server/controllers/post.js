const User = require('../models/User');
const Post = require('../models/Post');
const Like = require('../models/Like');
const Comment = require('../models/Comment');

const { cdupload } = require('../utils/cloudinary')
require('dotenv').config();

exports.createPost = async (req, res) => {
    try {
        const { title, desc } = req.body;
        const image = req.files.image;
        const userId = req.user.id;
        if (!title || !desc || !image) {
            throw new Error('All feilds are requiered');
        }
        const uploaded = cdupload(image, process.env.FOLDER);
        const post = await Post.create({ title: title, desc: desc, image: uploaded, userId: userId });
        if (!post) {
            throw new Error('uable to create post');
        }
        await User.findByIdAndUpdate(userId, { $push: { posts: post._id } });
        res.status(200).json({
            success: true,
            message: 'Post created successfully',
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
        const { postId } = req.body;
        const userId = req.user.id;
        const deleted = await Post.findByIdAndDelete(postId);
        const user = await User.findByIdAndUpdate(userId, { $pull: { posts: postId } });
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
        const { postId, userId } = req.body;
        if (!postId || !userId) {
            throw new Error('All feilds are requiered');
        }
        const likedPost = await Like.create({
            post: postId,
            user: userId
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

exports.commentPost = async (req, res) => {
    try {
        const { postId, userId , comment } = req.body;
        if (!postId || !userId) {
            throw new Error('All feilds are requiered');
        }
        const commentPost = await Comment.create({
            post: postId,
            user: userId,
            comment
        });
        if (!commentPost) {
            throw new Error('unable to comment post');
        }
        await Post.findByIdAndUpdate(postId, { $push: { comment: commentPost._id } });
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