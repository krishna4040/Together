const Chat = require('../models/Chat');

exports.accessChat = async (req, res) => {
    try {
        const { userId } = req.body;
        if (!userId) {
            throw new Error('userId not provided');
        }
        const isChat = await Chat.find({
            isGroupChat: false,
            $and: [
                { users: { $elemMatch: { $eq: req.user.id } } },
                { users: { $elemMatch: { $eq: userId } } }
            ]
        })
            .populate({ path: 'users', populate: 'profileDetails' })
            .populate({ path: 'latestMessage', populate: { path: 'sender', populate: 'profileDetails' } })
            .exec();
        if (isChat.length) {
            res.status(200).json({
                success: true,
                message: 'chat found',
                data: isChat[0]
            });
        } else {
            const createdChat = await Chat.create({
                chatName: 'sender',
                isGroupChat: false,
                users: [req.user.id, userId]
            });
            const fullChat = await Chat.findOne({ _id: createdChat._id }).populate('users').populate('lastestMessage')
            res.status(200).json({
                success: true,
                message: 'chat created',
                data: fullChat
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

exports.fetchChat = async (req, res) => {
    try {
        const userChat = await Chat.find({ users: { $elemMatch: { $eq: req.user.id } } })
            .populate({ path: 'users', populate: 'profileDetails' })
            .populate({ path: 'latestMessage', populate: { path: 'sender', populate: 'profileDetails' } })
            .exec()
        res.status(200).json({
            success: true,
            message: 'chat for the user fecthed',
            data: userChat
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

exports.createGroupChat = async (req, res) => {
    try {
        const { users, chatName } = req.body;
        const { id } = req.user;
        if (!users) {
            throw new Error('users not found');
        }
        if (users.length < 2) {
            throw new Error('users must be greater than 2');
        }
        const groupChat = await Chat.create({
            chatName,
            users,
            isGroupChat: true,
            groupAdmin: id
        })
        const fullChat = await Chat.findOne({ _id: groupChat._id })
            .populate({ path: 'users', populate: 'profileDetails' })
            .populate({ path: 'latestMessage', populate: { path: 'sender', populate: 'profileDetails' } })
        res.status(200).json({
            success: true,
            message: 'grp chat created',
            data: fullChat
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

exports.renameGroup = async (req, res) => {
    try {
        const { chatId, chatName } = req.body;
        const updatedChat = await Chat.findByIdAndUpdate(chatId, { chatName }, { new: true })
            .populate({ path: 'users', populate: 'profileDetails' })
            .populate({ path: 'latestMessage', populate: { path: 'sender', populate: 'profileDetails' } })
        if (!updatedChat) {
            throw new Error('chat not found with that id');
        } else {
            res.status(200).json({
                success: true,
                message: 'chat grp name updated',
                data: updatedChat
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

exports.addToGroup = async (req, res) => {
    try {
        const { chatId, userId } = req.body;
        const added = await Chat.findByIdAndUpdate(chatId, {
            $push: { users: userId }
        }, {
            new: true
        })
            .populate({ path: 'users', populate: 'profileDetails' })
            .populate({ path: 'latestMessage', populate: { path: 'sender', populate: 'profileDetails' } })
        if (!added) {
            throw new Error('chat not found');
        } else {
            res.status(200).json({
                success: true,
                message: 'user added successfully',
                data: added
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

exports.removeFromGrp = async (req, res) => {
    try {
        const { chatId, userId } = req.body;
        const removed = await Chat.findByIdAndUpdate(chatId, {
            $pull: { users: userId }
        }, {
            new: true
        })
            .populate({ path: 'users', populate: 'profileDetails' })
            .populate({ path: 'latestMessage', populate: { path: 'sender', populate: 'profileDetails' } })
        if (!removed) {
            throw new Error('chat not found');
        } else {
            res.status(200).json({
                success: true,
                message: 'user added successfully',
                data: added
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}