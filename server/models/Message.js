const mongoose = require('mongoose');

/**
 * @swagger
 * components:
 *   schemas:
 *     Message:
 *       type: object
 *       properties:
 *         sender:
 *           type: string
 *           description: The ID of the user who sent the message.
 *         content:
 *           type: string
 *           description: The content of the message.
 *         chat:
 *           type: string
 *           description: The ID of the chat to which the message belongs.
 */

const messageModel = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    content: String,
    chat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chat'
    }
});

module.exports = mongoose.model('Message', messageModel);