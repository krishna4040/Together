const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    from: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    message: String,
})

module.exports = mongoose.model('Notification',notificationSchema);