const User = require('../models/User');
const Profile = require('../models/Profile');
const Post = require('../models/Post');
const Like = require('../models/Like');
const Comment = require('../models/Comment');

const { cdupload } = require('../utils/cloudinary');

exports.updateProfile = async (req, res) => {
    try {
        const { firstName = '', lastName = '', dob = Date.now(), gender = '', about = '' } = req.body;
        const userId = req.user.id;
        const pfp = req.files.pfp;
        if (!(firstName || lastName || gender || about || pfp)) {
            throw new Error('At least one feild is required');
        }
        const uploaded = await cdupload(pfp, process.env.FOLDER);
        const data = await Profile.create({
            firstName,
            lastName,
            dob,
            gender,
            about,
            age: Date.now() - dob,
            pfp: uploaded,
            user: userId
        });
        if (!data) {
            throw new Error('unable to update profile');
        }
        await User.findByIdAndUpdate(userId, { profileDeatils: data._id });
        res.status(200).json({
            success: true,
            message: 'Profile updated successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error
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
        const userId = req.user.id;
        const user = await User.findById(userId).populate('profileDeatils').populate('friends').populate('posts').populate('chat').exec();
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
            message: error
        });
    }
}