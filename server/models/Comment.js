const mongoose = require('mongoose');

/**
 * @swagger
 * components:
 *   schemas:
 *     Comment:
 *       type: object
 *       properties:
 *         post:
 *           type: string
 *           description: The ID of the associated post.
 *         user:
 *           type: string
 *           description: The ID of the user who made the comment.
 *         comment:
 *           type: string
 *           description: The comment text.
 */

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

module.exports = mongoose.model('Comment', commentSchema);