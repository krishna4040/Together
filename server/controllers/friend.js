const User = require('../models/User');
const Post = require('../models/Post');

exports.makeFriend = async (req, res) => {
    try {
        const { friendId } = req.body;
        const { id } = req.user;
        if (!friendId) {
            throw new Error('friend id is requiered');
        }
        const friend = await User.findById(friendId);
        if (!friend) {
            throw new Error('Friend id do not exist');
        }
        const user = await User.findById(id);
        const alReadyFriended = user.friends.includes(friend._id);
        if (alReadyFriended) {
            throw new Error('alReady friended');
        }
        const userAddFriend = await User.findByIdAndUpdate(id, { $push: { friends: friend._id } });
        const friendAddUser = await User.findByIdAndUpdate(friend._id, { $push: { friends: id } });
        if (!userAddFriend || !friendAddUser) {
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
        const friend = await User.findById(friendId);
        if (!friend) {
            throw new Error('friend not found');
        }
        const user = await User.findById(id);
        const alReadyFriended = user.friends.includes(friend._id);
        if (!alReadyFriended) {
            throw new Error('user not found in friend list');
        }
        const userRemoveFriend = await User.findByIdAndUpdate(id, { $pull: { friends: friend._id } });
        const friendRemoveUser = await User.findByIdAndUpdate(friend._id, { $pull: { friends: id } });
        if (!userRemoveFriend || !friendRemoveUser) {
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

exports.getFriendsPost = async (req, res) => {
    try {
        const { id } = req.user;
        const user = await User.findById(id);
        const friends = user.friends;

        const allPost = [];
        for (let i = 0; i < friends.length; i++) {
            const friendsPost = await Post.find({ user: friends[i] }).populate('likes').populate('comments').populate({ path: 'user', populate: 'profileDetails' }).exec();
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