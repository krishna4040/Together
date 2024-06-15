const User = require('../models/User');
const Post = require('../models/Post');
const { shuffleArray } = require('../utils/shuffle');
const Notification = require('../models/Notification');

exports.sendFriendRequest = async (req, res) => {
    try {
        const { friendId } = req.body;
        const { id } = req.user;
        if (!friendId) {
            throw new Error('friend id is required');
        }

        const friend = await User.findById(friendId)
        if (!friend) {
            throw new Error('Friend id do not exist');
        }

        const idx = friend.requests.findIndex(req => req == id)
        if (idx != -1) {
            throw new Error('Friend request already sent');
        }

        const user = await User.findById(id)

        await friend.updateOne({ $push: { requests: id } })
        await friend.save();
        await Notification.create({
            for: friendId,
            by: id,
            content: `${user.userName} has requested to connect`,
            notificationType: 'friend-request',
        })

        res.status(200).json({
            success: true,
            message: 'friend request sent successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

exports.withDrawFriendRequest = async (req, res) => {
    try {
        const { friendId } = req.body;
        const { id } = req.user;
        if (!friendId) {
            throw new Error('friend id is required');
        }

        const friend = await User.findById(friendId)
        if (!friend) {
            throw new Error('Friend id do not exist');
        }

        const idx = friend.requests.findIndex(req => req == id)
        if (idx == -1) {
            throw new Error('Friend request not sent');
        }

        await friend.updateOne({ $pull: { requests: id } })
        await friend.save();

        await Notification.findOneAndDelete({ for: friendId, by: id })

        res.status(200).json({
            success: true,
            message: 'friend request withdrawn'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

exports.acceptFriendRequest = async (req, res) => {
    try {
        console.log("Hello")
        const { id } = req.user;
        const { friendId } = req.body;
        if (!friendId) {
            throw new Error('friend id is required');
        }
        const friend = await User.findById(friendId)
        const user = await User.findById(id)
        if (!friend) {
            throw new Error('Friend do not exist');
        }

        await friend.updateOne({ $push: { friends: id } })
        await user.updateOne({ $pull: { requests: friendId }, $push: { friends: friendId } })

        await friend.save();
        await user.save();

        await Notification.findOneAndDelete({ for: id, by: friendId })

        await Notification.create({
            for: friendId,
            by: id,
            content: `${user.userName} have accepted your connection`,
            notificationType: 'friend-request',
        })

        res.status(200).json({
            success: true,
            message: 'friend accepted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

exports.rejectFriendRequest = async (req, res) => {
    try {
        console.log("Hit")
        const { id } = req.user;
        const { friendId } = req.body;
        if (!friendId) {
            throw new Error('friend id is required');
        }
        const user = await User.findById(id)

        await user.updateOne({ $pull: { requests: { friendId } } })
        await user.save()

        await Notification.findOneAndDelete({ for: id, by: friendId })

        res.status(200).json({
            success: true,
            message: 'friend accepted successfully'
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
            throw new Error('friend id is required');
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
            message: 'friend removed successfully'
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
            message: 'friends details fetched successfully',
            data: friends
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

exports.getFriendsPosts = async (req, res) => {
    try {
        const { id } = req.user
        if (!id) {
            throw new Error('id not found')
        }
        const user = await User.findById(id).populate({ path: 'friends' }).select('friends').exec();
        const friendIds = user.friends.map(friend => friend._id)

        if (!friendIds.length) {
            return res.status(200).json({
                success: true,
                message: 'No Friends Found',
                data: []
            });
        }

        const posts = await Post.find({ user: { $in: friendIds } }).populate('likes').populate('comments').populate({ path: 'user', populate: 'profileDetails' }).exec();
        const shuffledPosts = shuffleArray(posts)

        res.status(200).json({
            success: true,
            message: 'posts fetched successfully',
            data: shuffledPosts
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}