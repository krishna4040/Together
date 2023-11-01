const Chat = require('../models/Chat');
const User = require('../models/User');

exports.addMessage = async (req, res) => {
    try {
        const { id } = req.user;
        const { message, friend_id } = req.body;
        const check = await Chat.find({ user: id, friend: friend_id });
        if (check.length) {
            await Chat.findOneAndUpdate({ user: id, friend: friend_id }, {
                $push: { messages: { id, message } }
            });
            res.status(200).json({
                success: true,
                message: 'Message added successfully'
            });
        }
        else {
            const chat = await Chat.create({
                user: id,
                friend: friend_id,
                messages: [
                    {
                        id,
                        message
                    }
                ]
            });
            await User.findByIdAndUpdate(id, { $push: { chat: chat._id } });
            res.status(200).json({
                success: true,
                message: 'Message added to db succesesfully'
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

exports.getFriendChat = async (req, res) => {
    try {
        const { id } = req.user;
        const { friend_id } = req.body;
        if (!friend_id) {
            throw new Error('friend id not received');
        }
        const chat = await Chat.find({ user: id, friend: friend_id });
        if (!chat.length) {
            throw new Error('unable to fecth chat')
        }
        res.status(200).json({
            success: true,
            message: 'Friend chat fecthed successfully',
            data: chat
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}