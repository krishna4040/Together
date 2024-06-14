const mongoose = require('mongoose');

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         userName:
 *           type: string
 *           description: The username of the user.
 *         email:
 *           type: string
 *           description: The email address of the user.
 *         password:
 *           type: string
 *           description: The password of the user.
 *         profileDetails:
 *           type: object
 *           description: Details of the user's profile.
 *           properties:
 *             _id:
 *               type: string
 *               description: The ID of the user's profile.
 *         friends:
 *           type: array
 *           description: An array of the user's friends.
 *           items:
 *             type: string
 *             description: The ID of a friend user.
 *         posts:
 *           type: array
 *           description: An array of the user's posts.
 *           items:
 *             type: string
 *             description: The ID of a post.
 *         chat:
 *           type: array
 *           description: An array of chats the user is a part of.
 *           items:
 *             type: string
 *             description: The ID of a chat.
 */

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
    },
    password: String,
    profileDetails: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile'
    },
    requests: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    friends: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post'
        }
    ]
})

module.exports = mongoose.model('User', userSchema);