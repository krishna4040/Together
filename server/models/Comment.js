const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    comment: String
});

console.log("comment model created");
module.exports = mongoose.model('Comment', commentSchema);