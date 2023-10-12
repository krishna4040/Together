const User = require('../models/User');
const Profile = require('../models/Profile');
const Post = require('../models/Post');
const Like = require('../models/Like');
const Comment = require('../models/Comment');
const Chat = require('../models/Chat');
const { cdupload } = require('../utils/cloudinary');
require('dotenv').config();

exports.createProfile = async (req, res) => {
    try {
        const { id } = req.user;
        const { firstName, lastName, bday, gender, about } = req.body;
        const dob = new Date(bday);
        const { pfp } = req.files;
        if (!firstName || !lastName || !pfp || !dob || !gender || !about) {
            throw new Error('All feilds are requiered');
        }
        const uploaded = await cdupload(pfp, process.env.FOLDER);
        const data = await Profile.create({
            firstName,
            lastName,
            gender,
            about,
            pfp: uploaded,
            user: id,
            dob,
            age: new Date().getFullYear() - dob.getFullYear()
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

    }
}

exports.getUserDetails = async (req, res) => {
    try {
        const {id} = req.user;
        const user = await User.findById(id)
            .populate('profileDetails')
            .populate({path: 'friends' , populate: {path: 'user' , populate: 'profileDetails'}})
            .populate({path: 'posts' , populate: {path: 'likes' , populate: {path: 'user' , populate: 'profileDetails'}}})
            .populate({path: 'posts' , populate: {path: 'comments' , populate: {path: 'user' , populate: 'profileDetails'}}})
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

exports.updatePfp = async (req,res) => {
    try {
        const {pfp} = req.files;
        if (!pfp) {
            return new Error('pfp not found');
        }
        const {id} = req.user;
        const user = await User.findById(id);
        const uploaded = await cdupload(pfp,process.env.FOLDER);
        if (!uploaded) {    
            throw new Error('unable to upload pfp');
        }
        await Post.findByIdAndUpdate(user.profileDetails,{image: uploaded});
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
        const {about} = req.body;
        if (!about) {
            return new Error('about not found');
        }
        const {id} = req.user;
        const user = await User.findById(id);
        const uploaded = await cdupload(pfp,process.env.FOLDER);
        if (!uploaded) {    
            throw new Error('unable to upload pfp');
        }
        await Post.findByIdAndUpdate(user.profileDetails,{about: uploaded});
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