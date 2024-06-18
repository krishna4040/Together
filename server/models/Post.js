const mongoose = require('mongoose');

/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       properties:
 *         user:
 *           type: string
 *           description: The ID of the user who created the post.
 *         title:
 *           type: string
 *           description: The title of the post.
 *         image:
 *           type: string
 *           description: The URL of the image associated with the post.
 *         desc:
 *           type: string
 *           description: The description or content of the post.
 *         likes:
 *           type: array
 *           description: An array of user IDs who liked the post.
 *           items:
 *             type: string
 *             description: The ID of a user who liked the post.
 *         comments:
 *           type: array
 *           description: An array of comment IDs associated with the post.
 *           items:
 *             type: string
 *             description: The ID of a comment associated with the post.
 */

const postSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    title: String,
    images: [String],
    desc: String,
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Like'
        }
    ],
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
})

module.exports = mongoose.model('Post', postSchema);