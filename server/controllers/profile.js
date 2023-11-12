const User = require('../models/User');
const Profile = require('../models/Profile');
const Post = require('../models/Post');
const Like = require('../models/Like');
const Comment = require('../models/Comment');
const Chat = require('../models/Chat');
const { cdupload } = require('../utils/cloudinary');
require('dotenv').config();
const cloudinary = require('cloudinary').v2;

exports.createProfile = async (req, res) => {
    try {
        const { id } = req.user;
        const { gender } = req.body;
        let pfp;
        if (gender === 'Male') {
            pfp = cloudinary.url('Together/Firefly_user_icon_45739_yj31wj');
        } else {
            pfp = cloudinary.url('Together/Firefly_user_icon_72437_ne1d0o');
        }
        const data = await Profile.create({
            gender,
            pfp,
            user: id,
        });
        if (!data) {
            throw new Error('unable to update profile');
        }
        const user = await User.findById(id);
        user.profileDetails = data._id;
        user.save();
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
            message: 'Acconut deleted suuccesfully'
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
            .populate('chat')
            .exec();
        if (!user) {
            throw new Error('Unable to get user details');
        }
        res.status(200).json({
            success: true,
            message: 'fechted user details successfully',
            data: user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

exports.updatePfp = async (req, res) => {
    try {
        const { pfp } = req.files;
        if (!pfp) {
            return new Error('pfp not found');
        }
        const { id } = req.user;
        const user = await User.findById(id);
        const uploaded = await cdupload(pfp, process.env.FOLDER);
        if (!uploaded) {
            throw new Error('unable to upload pfp');
        }
        await Profile.findByIdAndUpdate(user.profileDetails, { image: uploaded });
        res.status(200).json({
            success: true,
            messgae: 'pfp updated successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            messgae: error.message
        });
    }
}

exports.updateAbout = async (req, res) => {
    try {
        const { about } = req.body;
        if (!about) {
            return new Error('about not found');
        }
        const { id } = req.user;
        const user = await User.findById(id);
        await Profile.findByIdAndUpdate(user.profileDetails, { about });
        res.status(200).json({
            success: true,
            messgae: 'about updated successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            messgae: error.message
        });
    }
}

exports.updateFirstName = async (req, res) => {
    try {
        const { firstName } = req.body;
        const { id } = req.user;
        if (!firstName) {
            throw new Error('firstName not found');
        }
        await Profile.findOneAndUpdate({ user: id }, { firstName });
        res.status(200).json({
            success: true,
            messgae: 'firstName updated successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            messgae: error.message
        });
    }
}

exports.updateLastName = async (req, res) => {
    try {
        const { lastName } = req.body;
        const { id } = req.user;
        if (!lastName) {
            throw new Error('lastName not found');
        }
        await Profile.findOneAndUpdate({ user: id }, { lastName });
        res.status(200).json({
            success: true,
            messgae: 'about lastName successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            messgae: error.message
        });
    }
}

exports.updateDob = async (req, res) => {
    try {
        const { bday } = req.body;
        const { id } = req.user;
        if (!bday) {
            throw new Error('bDay not found');
        }
        const dob = new Date(bday);
        const age = new Date().getFullYear() - dob.getFullYear();
        await Profile.findOneAndUpdate({ user: id }, { dob, age });
        res.status(200).json({
            success: true,
            messgae: 'dob and age updated successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            messgae: error.message
        });
    }
}