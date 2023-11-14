const express = require('express');
const router = express.Router();

const { auth } = require('../middlewares/auth');
const { getAllUsers, search, getUserNameSuggestions } = require('../controllers/allUsers');

// AllUsers
/**
 * @swagger
 * /all-users/getAllUsers:
 *   get:
 *     summary: Get all users
 *     description: Retrieves a list of all users (excluding the authenticated user) in the database.
 *     tags:
 *       - All-users
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Users fetched successfully.
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
 *               type: array
 *               description: An array of user data (excluding the authenticated user).
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
router.get('/getAllUsers', auth, getAllUsers);

/**
 * @swagger
 * /all-users/search:
 *   get:
 *     summary: Search for a user by username
 *     description: Searches for a user by their username.
 *     tags:
 *       - All-users
 *     parameters:
 *       - name: userName
 *         in: query
 *         description: The username to search for.
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: User found successfully.
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
 *               type: array
 *               description: An array of user data matching the username.
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
router.get('/search', search);

router.get('/suggestion', getUserNameSuggestions);

module.exports = router;