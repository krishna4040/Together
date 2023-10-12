const mongoose = require('mongoose');
const Notification = require('./Notification');

const chatSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    friend: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    message: String,
    sentAt: Date
});

chatSchema.pre('save' , function() {
    Notification.create({
        from: this.friend,
        message: this.message
    });
});

module.exports = mongoose.model('Chat', chatSchema);