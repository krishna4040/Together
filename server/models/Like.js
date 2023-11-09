const mongoose = require('mongoose');

/**
 * @swagger
 * components:
 *   schemas:
 *     Like:
 *       type: object
 *       properties:
 *         post:
 *           type: string
 *           description: The ID of the post that was liked.
 *         user:
 *           type: string
 *           description: The ID of the user who liked the post.
 */

const likeSchema = new mongoose.Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Like', likeSchema);