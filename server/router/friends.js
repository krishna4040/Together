const express = require('express');
const router = express.Router();

const { auth } = require('../middlewares/auth');
const { makeFriend, removeFriend, getFriendsPost } = require('../controllers/friend');

// Friends Routes
/**
 * @swagger
 * /makeFriend:
 *   put:
 *     summary: Make a friend
 *     description: Send a friend request and make a friend with another user.
 *     tags:
 *       - Friends
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: friendId
 *         in: body
 *         description: The ID of the user to make as a friend.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             friendId:
 *               type: string
 *         example:
 *           friendId: "friend_user_id"
 *     responses:
 *       200:
 *         description: Friend added successfully.
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
router.put('/makeFriend', auth, makeFriend);

/**
 * @swagger
 * /removeFriend:
 *    put:
 *     summary: Remove a friend
 *     description: Remove a friend from the user's friend list.
 *     tags:
 *       - Friends
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: friendId
 *         in: body
 *         description: The ID of the friend to be removed.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             friendId:
 *               type: string
 *         example:
 *           friendId: "friend_user_id"
 *     responses:
 *       200:
 *         description: Friend removed successfully.
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
router.put('/removeFriend', auth, removeFriend);

/**
 * @swagger
 * /getFriendsPost/{id}:
 *   get:
 *     summary: Get posts from friends
 *     description: Retrieves posts from the friends of a user by providing the user's ID.
 *     tags:
 *       - Friends
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the user to fetch posts from friends.
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Friends' posts fetched successfully.
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
 *               description: An array of posts from friends.
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
router.get('/getFriendsPost/:id', getFriendsPost);

module.exports = router;