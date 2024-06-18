const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2

/**
 * @swagger
 * components:
 *   schemas:
 *     Profile:
 *       type: object
 *       properties:
 *         firstName:
 *           type: string
 *           description: The first name of the user.
 *         lastName:
 *           type: string
 *           description: The last name of the user.
 *         dob:
 *           type: string
 *           format: date
 *           description: The date of birth of the user.
 *         age:
 *           type: number
 *           description: The age of the user.
 *         gender:
 *           type: string
 *           enum:
 *             - Male
 *             - Female
 *             - Other
 *           description: The gender of the user.
 *         about:
 *           type: string
 *           description: Information about the user.
 *         pfp:
 *           type: string
 *           description: The profile picture URL of the user.
 *         user:
 *           type: string
 *           description: The ID of the associated user.
 */

const profileSchema = new mongoose.Schema({
    firstName: {
        type: String,
        default: ''
    },
    lastName: {
        type: String,
        default: ''
    },
    dob: {
        type: Date,
        default: null
    },
    age: {
        type: Number,
        default: null
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        required: true
    },
    about: {
        type: String,
        default: 'New to together'
    },
    pfp: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    visibility: {
        type: String,
        enum: ['Public', 'Private'],
        default: 'Public'
    }
});

module.exports = mongoose.model('Profile', profileSchema);