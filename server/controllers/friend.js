const User = require('../models/User');

exports.makeFriend = async (req, res) => {
    try {
        const { friendId } = req.body;
        const userId = req.user.id;
        if (!friendId) {
            throw new Error('friend id is requiered');
        }
        const user = await User.findByIdAndUpdate(userId, { $push: { friends: friendId } });
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
        const userId = req.user.id;
        if (!friendId) {    
            throw new Error('friend id is requiered');
        }
        const user = await User.findByIdAndUpdate(userId,{$pull:{friends: friendId}});
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