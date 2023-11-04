const mongoose = require('mongoose');

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