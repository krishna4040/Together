const User = require('../models/User');
const Notification = require('../models/Notification');

exports.sendFriendRequest = async (req, res) => {
    try {
        const { friendId } = req.body;
        const { id } = req.user;
        if (!friendId) {
            throw new Error('friend id is required');
        }

        const friend = await User.findById(friendId).populate('profileDetails').exec();
        if (!friend) {
            throw new Error('Friend id do not exist');
        }
        if (friend.profileDetails.visibility === 'public') {
            throw new Error('cannot send a public account');
        }

        const idx = friend.requests.findIndex(req => req == id)
        if (idx != -1) {
            throw new Error('Friend request already sent');
        }

        const user = await User.findById(id)

        await friend.updateOne({ $push: { requests: id } })
        await friend.save();
        await Notification.create({
            for: [friendId],
            by: id,
            content: `${user.userName} has requested to connect`,
            notificationType: 'action',
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

        const friend = await User.findById(friendId).populate('profileDetails').exec();
        if (!friend) {
            throw new Error('Friend id do not exist');
        }

        if (friend.profileDetails.visibility === 'public') {
            throw new Error('cannot withdraw req from public account');
        }

        const idx = friend.requests.findIndex(req => req == id)
        if (idx == -1) {
            throw new Error('Friend request not sent');
        }

        await friend.updateOne({ $pull: { requests: id } })
        await friend.save();

        await Notification.findOneAndDelete({ for: friendId, by: id, notificationType: 'action' })

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

        await Notification.findOneAndDelete({ for: id, by: friendId, notificationType: 'action' })

        await Notification.create({
            for: [friendId],
            by: id,
            content: `${user.userName} have accepted your connection`,
            notificationType: 'readOnly',
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

        await Notification.findOneAndDelete({ for: id, by: friendId, notificationType: 'action' })

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

exports.followFriend = async (req, res) => {
    try {
        const { friendId } = req.body;
        const { id } = req.user;
        if (!friendId) {
            throw new Error('friend id is required');
        }
        const friend = await User.findById(friendId).populate('profileDetails');
        if (!friend) {
            throw new Error('friend not found');
        }
        if (friend.profileDetails.visibility === 'private') {
            throw new Error('cannot follow a private account');
        }
        const user = await User.findById(id);
        const alReadyFriended = user.friends.includes(friend._id);
        if (alReadyFriended) {
            throw new Error('Already followed');
        }
        const userAddFriend = await User.findByIdAndUpdate(id, { $push: { friends: friend._id } });
        const friendAddUser = await User.findByIdAndUpdate(friend._id, { $push: { friends: id } });
        if (!userAddFriend || !friendAddUser) {
            throw new Error('unable to follow');
        }
        res.status(200).json({
            success: true,
            message: 'friend followed successfully'
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

exports.getMutualFriends = async (req, res) => {
    try {
        const { id } = req.user;
        const { userId } = req.query;
        if (!userId) {
            throw new Error('friend id is required');
        }

        const user1 = await User.findById(id).populate({path: 'friends', populate: 'profileDetails'}).exec()
        const user2 = await User.findById(userId)
        const mutualFriends = user1.friends.filter(friend => user2.friends.includes(friend._id))

        res.status(200).json({
            success: true,
            message: 'mutual friends fetched successfully',
            data: mutualFriends
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}