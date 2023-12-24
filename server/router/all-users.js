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

/**
 * @swagger
 * /all-users/suggestion:
 *   get:
 *     summary: Get username suggestions based on a query.
 *     description: Retrieves username suggestions that match a provided query string.
 *     tags:
 *       - All-users
 *     parameters:
 *       - in: query
 *         name: q
 *         description: Query string to search for username suggestions.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful response with username suggestions.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the request was successful.
 *                 message:
 *                   type: string
 *                   description: Informational message regarding the status.
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *       '500':
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the request failed.
 *                 message:
 *                   type: string
 *                   description: Error message describing the failure.
 */
router.get('/suggestion', getUserNameSuggestions);

module.exports = router;