const mongoose = require('mongoose');

/**
 * @swagger
 * components:
 *   schemas:
 *     Chat:
 *       type: object
 *       properties:
 *         chatName:
 *           type: string
 *           description: The name of the chat.
 *         isGroupChat:
 *           type: boolean
 *           description: Indicates whether the chat is a group chat (true) or a one-on-one chat (false).
 *         users:
 *           type: array
 *           description: An array of user IDs who are part of the chat.
 *           items:
 *             type: string
 *             description: The ID of a user who is part of the chat.
 *         latestMessage:
 *           type: string
 *           description: The ID of the latest message in the chat.
 *         groupAdmin:
 *           type: string
 *           description: The ID of the group admin user if it is a group chat.
 */

const chatSchema = new mongoose.Schema({
    chatName: String,
    isGroupChat: Boolean,
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    latestMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message'
    },
    groupAdmin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Chat', chatSchema);