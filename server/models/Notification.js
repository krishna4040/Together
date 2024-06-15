const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    for: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: String,
    notificationType: {
        type: String,
        enum: ['action', 'readOnly'],
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        expires: 24 * 7 * 60 * 60 * 1000, // 7 days
    }
})

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;