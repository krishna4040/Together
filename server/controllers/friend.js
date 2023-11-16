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

exports.getFriends = async (req, res) => {
    try {
        const { id } = req.query;
        if (!id) {
            throw new Error('id not found');
        }
        const user = await User.findById(id).populate({ path: 'friends', populate: 'profileDetails' }).select('friends').exec();
        if (!user) {
            throw new Error('user with current id not found');
        }
        const friends = user.friends;
        res.status(200).json({
            success: true,
            message: 'frinends details fecthed successfully',
            data: friends
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}