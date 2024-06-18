const User = require('../models/User');
const Profile = require('../models/Profile');
const Post = require('../models/Post');
const Like = require('../models/Like');
const Comment = require('../models/Comment');
const { cdupload } = require('../utils/cloudinary');
require('dotenv').config();

exports.createProfile = async (req, res) => {
    try {
        const { gender, id, userName } = req.body;
        let pfp;
        //TODO: use dice-bearer to generate avatar
        const data = await Profile.create({
            gender,
            pfp,
            user: id,
        });
        if (!data) {
            throw new Error('unable to update profile');
        }
        const user = await User.findByIdAndUpdate(id, { userName, profileDetails: data._id });
        res.status(200).json({
            success: true,
            message: 'Profile updated successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId);

        const profileId = user.profileDetails;
        const postIds = user.posts;

        await Profile.findByIdAndDelete(profileId);
        for (let i = 0; i < postIds.length; i++) {
            const post = await Post.findById(postIds[i]);
            const likedIds = post.likes;
            const commentIds = post.comments;

            for (let j = 0; j < likedIds.length; j++) {
                await Like.findByIdAndDelete(likedIds[j]);
            }

            for (let j = 0; j < commentIds.length; j++) {
                await Comment.findByIdAndDelete(commentIds[j]);
            }

            await Post.findByIdAndDelete(postIds[i]);
        }
        await User.findByIdAndDelete(userId);

        res.status(200).json({
            success: true,
            message: 'Account deleted successfully'
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

exports.getUserDetails = async (req, res) => {
    try {
        const { id } = req.user;
        const user = await User.findById(id)
            .populate('profileDetails')
            .populate({ path: 'friends', populate: 'profileDetails' })
            .populate({ path: 'posts', populate: { path: 'likes', populate: { path: 'user', populate: 'profileDetails' } } })
            .populate({ path: 'posts', populate: { path: 'comments', populate: { path: 'user', populate: 'profileDetails' } } })
            .exec();
        if (!user) {
            throw new Error('Unable to get user details');
        }
        res.status(200).json({
            success: true,
            message: 'fetched user details successfully',
            data: user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

exports.updateProfile = async (req, res) => {
    try {
        const { id } = req.user;
        const updateData = req.body;

        console.log(req)

        const { pfp } = req.files

        if (pfp) {
            const image = await cdupload(pfp, process.env.FOLDER);
            if (!image) {
                throw new Error('unable to upload pfp');
            }
            uploadData.pfp = image
        }
        console.log(updateData)
        const user = await User.findById(id);
        const profile = await Profile.findById(user.profileDetails, updateData);

        res.status(200).json({
            success: true,
            message: 'profile updated successfully',
            data: profile
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}
