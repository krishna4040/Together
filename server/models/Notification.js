const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    from: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    message: String,
})

console.log("notification model created");
module.exports = mongoose.model('Notification',notificationSchema);