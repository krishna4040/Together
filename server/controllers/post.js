const User = require('../models/User');
const Post = require('../models/Post');
const Like = require('../models/Like');
const Comment = require('../models/Comment');
const { shuffleArray } = require('../utils/shuffle');

const { cdupload } = require('../utils/cloudinary');
const Notification = require('../models/Notification');
require('dotenv').config();

exports.createPost = async (req, res) => {
    try {
        const { title, desc } = req.body;
        const { image } = req.files;
        const { id } = req.user;
        if (!title || !desc || !image) {
            throw new Error('All fields are required');
        }
        const uploaded = await cdupload(image, process.env.FOLDER);
        const post = await Post.create({ title: title, desc: desc, image: uploaded, user: id });
        if (!post) {
            throw new Error('unable to create post');
        }
        const user = await User.findByIdAndUpdate(id, { $push: { posts: post._id } });
        await Notification.create({
            for: user.friends,
            by: id,
            notificationType: 'readOnly',
            content: `${user.userName} has created a post, check it out!`
        })
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
        await Post.findByIdAndDelete(postId);
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
            throw new Error('Post id is required');
        }
        const alReadyLiked = await Like.findOne({ user: id, post: postId })
        if (alReadyLiked) {
            throw new Error('You have already liked this post')
        }
        const likedPost = await Like.create({
            post: postId,
            user: id
        });
        if (!likedPost) {
            throw new Error('unable to like post');
        }
        const post = await Post.findByIdAndUpdate(postId, { $push: { likes: likedPost._id } });
        const user = await User.findById(id)
        await Notification.create({
            for: [post.user],
            by: id,
            notificationType: 'readOnly',
            content: `${user.userName} has liked your post`
        })
        res.status(200).json({
            success: true,
            message: "post liked successfully",
            data: likedPost
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
        const { id } = req.user;
        const { postId } = req.body;
        if (!postId) {
            throw new Error('Post id is required');
        }
        const likedPost = await Like.findOne({ user: id, post: postId })
        if (!likedPost) {
            throw new Error('You have not liked this post')
        }

        await likedPost.deleteOne();
        await Post.findByIdAndUpdate(postId, { $pull: { likes: likedPost._id } });

        res.status(200).json({
            success: true,
            message: 'post unLiked successfully'
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
            throw new Error('All fields are required');
        }
        const commentPost = await Comment.create({
            post: postId,
            user: id,
            comment
        });
        if (!commentPost) {
            throw new Error('unable to comment post');
        }
        const post = await Post.findByIdAndUpdate(postId, { $push: { comments: commentPost._id } });
        const user = await User.findById(id)

        await Notification.create({
            for: [post.user],
            by: id,
            notificationType: 'readOnly',
            content: `${user.userName}: ${comment} on the post ${post.title}`
        })

        res.status(200).json({
            success: true,
            message: "post commented successfully",
            data: post
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
            message: 'fetched all liked post by the user',
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
        const comments = await Comment.find({ post: postId }).populate({path: 'user', populate: 'profileDetails'}).exec();
        res.status(200).json({
            success: true,
            message: 'Comments for a Post fetched',
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
            message: 'fetched user posts',
            data: post
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

exports.getAllPosts = async (req, res) => {
    try {
        const allPosts = await Post.find({}).populate('likes').populate('comments').populate({ path: 'user', populate: 'profileDetails' }).exec();
        const shufflePosts = shuffleArray(allPosts);
        res.status(200).json({
            success: true,
            message: 'all posts fetched successfully',
            data: shufflePosts
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}