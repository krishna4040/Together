const Chat = require('../models/Chat');
const User = require('../models/User');

exports.accessChat = async (req, res) => {
    try {
        const { userId } = req.body;
        if (!userId) {
            throw new Error('userId not provided');
        }
        let isChat = await Chat.find({
            isGroupChat: false,
            $and: [
                { users: { $elemMatch: { $eq: req.user.id } } },
                { users: { $elemMatch: { $eq: userId } } }
            ]
        })
            .populate('users')
            .populate('latestMessage')

        isChat = await User.populate(isChat, {
            path: 'latestMessage.sender',
            select: 'profileDetails'
        });

        if (isChat.length) {
            res.send(isChat[0]);
        } else {
            const chatData = {
                chatName: 'sender',
                isGroupChat: false,
                users: [req.user.id, userId]
            }
            const createdChat = await Chat.create(chatData);
            const fullChat = await Chat.findOne({ _id: createdChat._id }).populate('users').populate('lastestMessage')
            res.send(fullChat);
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

exports.fecthChat = async (req, res) => {
    try {
        const userChat = await Chat.find({ users: { $elemMatch: { $eq: req.user.id } } });
        res.send(userChat);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}