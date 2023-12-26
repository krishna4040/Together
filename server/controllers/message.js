const Chat = require('../models/Chat');
const Message = require('../models/Message');

exports.sendMessage = async (req, res) => {
    try {
        const { content, chatId } = req.body;
        if (!content || !chatId) {
            throw new Error('all fields are required');
        }
        let message = await Message.create({
            sender: req.user.id,
            content: content,
            chat: chatId
        });
        message = await message.populate({ path: 'sender', populate: 'profileDetails' });
        await Chat.findByIdAndUpdate(chatId, { latestMessage: message });
        res.status(200).json({
            success: true,
            data: message,
            message: 'msg sent successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
}

exports.allMessages = async (req, res) => {
    try {
        const messages = await Message.find({ chat: req.params.chatId }).populate({ path: 'sender', populate: 'profileDetails' }).populate("chat");
        res.status(200).json({
            success: true,
            data: messages
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
}