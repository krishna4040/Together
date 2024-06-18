const express = require('express');
const router = express.Router();

const { auth } = require('../middlewares/auth');
const { removeFriend, getFriends, getFriendsPosts, acceptFriendRequest, sendFriendRequest, rejectFriendRequest, withDrawFriendRequest, followFriend } = require('../controllers/friend');

// Friends Routes
/**
 * @swagger
 * /friends/makeFriend:
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
router.put('/sendFriendRequest', auth, sendFriendRequest);

router.put('/acceptFriendRequest', auth, acceptFriendRequest);

router.put('/rejectFriendRequest', auth, rejectFriendRequest);

router.put('/withdrawFriendRequest', auth, withDrawFriendRequest);

router.put('/followFriend', auth, followFriend)

/**
 * @swagger
 * /friends/removeFriend:
 *   put:
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
router.put('/removeFriend', auth, removeFriend);

router.get('/getFriends', getFriends);

router.get('/getFriendsPosts', auth, getFriendsPosts);

module.exports = router;