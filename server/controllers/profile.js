const User = require('../models/User');
const Profile = require('../models/Profile');
const Post = require('../models/Post');
const Like = require('../models/Like');
const Comment = require('../models/Comment');
const { cdupload } = require('../utils/cloudinary');
require('dotenv').config();

// exports.updateProfile = async (req, res) => {
//     try {
//         const { firstName, lastName, birthDay, gender, about='Tell us about Yourself' } = req.body;
//         const dob = new Date(birthDay);
//         const { id } = req.user;
//         if (!firstName || !lastName || !gender) {
//             throw new Error('All feilds are requiered');
//         }
//         const data = await Profile.create({
//             firstName,
//             lastName,
//             dob,
//             gender,
//             about,
//             age: Date.now() - dob,
//             user: id
//         });
//         if (!data) {
//             throw new Error('unable to update profile');
//         }
//         await User.findByIdAndUpdate(id, { profileDeatils: data._id });
//         res.status(200).json({
//             success: true,
//             message: 'Profile updated successfully'
//         });
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: error.message,
//         });
//     }
// }

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
        const user = await User.findById(id).populate('profileDetails').populate('friends').populate('posts').populate('chat').exec();
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