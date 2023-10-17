const User = require('../models/User');
const Post = require('../models/Post');

exports.makeFriend = async (req, res) => {
    try {
        const { friendId } = req.body;
        const { id } = req.user;
        if (!friendId) {
            throw new Error('friend id is requiered');
        }
        const user = await User.findByIdAndUpdate(id, { $push: { friends: friendId } });
        if (!user) {
            throw new Error('unable to make friend');
        }
        res.status(200).json({
            success: true,
            message: 'friend added succesfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

exports.removeFriend = async (req, res) => {
    try {
        const { friendId } = req.body;
        const { id } = req.user;
        if (!friendId) {
            throw new Error('friend id is requiered');
        }
        const user = await User.findByIdAndUpdate(id, { $pull: { friends: friendId } });
        if (!user) {
            throw new Error('unable to remove friend');
        }
        res.status(200).json({
            success: true,
            message: 'friend removed succesfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

exports.getFriendsPost = async (req,res) => {
    try {
        const {id} = req.user;
        const user = await User.findById(id);
        const friends = user.friends;

        const allPost = [];
        for (let i = 0; i < friends.length; i++) {
            const friendsPost = await Post.find({user: friends[i]}).populate('likes').populate('comments').populate({path: 'user' , populate: 'profileDetails'}).exec();
            allPost.push(friendsPost);
        }

        res.status(200).json({
            success: true,
            message: 'fecthed friends posts successfully',
            data: allPost
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}