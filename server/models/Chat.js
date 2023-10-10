const mongoose = require('mongoose');
const Notification = require('./Notification');

const chatSchema = new mongoose.Schema({
    user: {
        tpe: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    friend: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    message: String,
    sentAt: Date
});

chatSchema.pre('save', async function() {
    await Notification.create({from: this.user,message: this.message});
})

module.exports = mongoose.model('Chat',chatSchema);