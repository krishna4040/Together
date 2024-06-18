const express = require('express');
const router = express.Router();

const { auth } = require('../middlewares/auth');
const { deleteUser, getUserDetails, createProfile, updateProfile } = require('../controllers/profile');

// User Routes
/**
 * @swagger
 * /user/createProfile:
 *   post:
 *     summary: Create a user profile
 *     description: Creates a user profile by providing details such as first name, last name, birthday, gender, about, and profile picture (pfp).
 *     tags:
 *       - User
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: The first name of the user.
 *               lastName:
 *                 type: string
 *                 description: The last name of the user.
 *               bday:
 *                 type: string
 *                 format: date
 *                 description: The user's birthday in the format 'YYYY-MM-DD'.
 *               gender:
 *                 type: string
 *                 description: The gender of the user.
 *               about:
 *                 type: string
 *                 description: Information about the user.
 *               pfp:
 *                 type: string
 *                 format: binary
 *                 description: The user profile picture (pfp).
 *     consumes:
 *       - multipart/form-data
 *     responses:
 *       200:
 *         description: User profile created and updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the operation was successful (true for success).
 *                 message:
 *                   type: string
 *                   description: A success message.
 *       400:
 *         description: Invalid request data or missing fields.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the operation failed (false for failure).
 *                 message:
 *                   type: string
 *                   description: An error message describing the issue with the request data.
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the operation failed (false for failure).
 *                 message:
 *                   type: string
 *                   description: An error message describing the internal server error.
 */
router.post('/createProfile', createProfile);

/**
 * @swagger
 * /user/updatePfp:
 *   put:
 *     summary: Update user profile picture (pfp)
 *     description: Updates the user's profile picture (pfp) by providing a new image file.
 *     tags:
 *       - User
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               pfp:
 *                 type: string
 *                 format: binary
 *                 description: The new user profile picture (pfp).
 *     consumes:
 *       - multipart/form-data
 *     responses:
 *       200:
 *         description: User profile picture (pfp) updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the operation was successful (true for success).
 *                 message:
 *                   type: string
 *                   description: A success message.
 *       400:
 *         description: Invalid request data or missing fields.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the operation failed (false for failure).
 *                 message:
 *                   type: string
 *                   description: An error message describing the issue with the request data.
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the operation failed (false for failure).
 *                 message:
 *                   type: string
 *                   description: An error message describing the internal server error.
 */

/**
 * @swagger
 * /user/updateAbout:
 *   put:
 *     summary: Update user's about information
 *     description: Updates the user's about information by providing a new description.
 *     tags:
 *       - User
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               about:
 *                 type: string
 *                 description: The new about information for the user's profile.
 *     responses:
 *       200:
 *         description: User's about information updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the operation was successful (true for success).
 *                 message:
 *                   type: string
 *                   description: A success message.
 *       400:
 *         description: Invalid request data or missing fields.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the operation failed (false for failure).
 *                 message:
 *                   type: string
 *                   description: An error message describing the issue with the request data.
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the operation failed (false for failure).
 *                 message:
 *                   type: string
 *                   description: An error message describing the internal server error.
 */
router.put('/updateProfile', auth, updateProfile)

/**
 * @swagger
 * /user/deleteUser:
 *   delete:
 *     summary: Delete user account
 *     description: Deletes a user's account, including their profile, posts, likes, comments, and user information.
 *     tags:
 *       - User
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: User account deleted successfully.
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *               description: Indicates if the operation was successful (true for success).
 *             message:
 *               type: string
 *               description: A success message.
 *       500:
 *         description: Internal server error.
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *               description: Indicates if the operation failed (false for failure).
 *             message:
 *               type: string
 *               description: An error message describing the internal server error.
 */
router.delete('/deleteUser', auth, deleteUser);

/**
 * @swagger
 * /user/getUserDetails:
 *   get:
 *     summary: Get user details
 *     description: Retrieves detailed information about a user, including their profile, friends, posts, likes, comments, and chat data.
 *     tags:
 *       - User
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: User details fetched successfully.
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *               description: Indicates if the operation was successful (true for success).
 *             message:
 *               type: string
 *               description: A success message.
 *             data:
 *               type: object
 *               description: User details, including profile, friends, posts, likes, comments, and chat data.
 *       500:
 *         description: Internal server error.
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *               description: Indicates if the operation failed (false for failure).
 *             message:
 *               type: string
 *               description: An error message describing the internal server error.
 */
router.get('/getUserDetails', auth, getUserDetails);

module.exports = router;