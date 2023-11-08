const express = require('express');
const router = express.Router();

const { auth } = require('../middlewares/auth');
const { accessChat, fecthChat, createGroupChat, renameGroup, addToGroup, removeFromGrp } = require('../controllers/chat');

// Chat Routes
/**
 * @swagger
 * /accessChat:
 *   post:
 *     summary: Access a chat with another user
 *     description: Access an existing chat or create a new chat with another user by providing their user ID.
 *     tags:
 *       - Chat
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: userId
 *         in: body
 *         description: The ID of the user to access or create a chat with.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             userId:
 *               type: string
 *         example:
 *           userId: "user_id"
 *     responses:
 *       200:
 *         description: Chat found or created successfully.
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
 *               description: The chat information.
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
router.post('/createChat', auth, accessChat);

/**
 * @swagger
 * /fetchChat:
 *   get:
 *     summary: Fetch user's chats
 *     description: Fetch all the chats in which the current user is participating.
 *     tags:
 *       - Chat
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Chats fetched successfully.
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
 *               items:
 *                 type: object
 *                 description: Information about a chat.
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
router.get('/fecthUserChats', auth, fecthChat);

/**
 * @swagger
 * /createGroupChat:
 *   post:
 *     summary: Create a group chat
 *     description: Create a new group chat with multiple users.
 *     tags:
 *       - Chat
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: users
 *         in: body
 *         description: An array of user IDs to include in the group chat.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             users:
 *               type: array
 *               items:
 *                 type: string
 *             chatName:
 *               type: string
 *           example:
 *             users: ["user_id1", "user_id2"]
 *             chatName: "Group Chat Name"
 *     responses:
 *       200:
 *         description: Group chat created successfully.
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
 *               description: Information about the created group chat.
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
router.post('/group', auth, createGroupChat);

/**
 * @swagger
 * /renameGroup:
 *   put:
 *     summary: Rename a group chat
 *     description: Rename an existing group chat.
 *     tags:
 *       - Chat
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: chatId
 *         in: body
 *         description: The ID of the group chat to rename.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             chatId:
 *               type: string
 *             chatName:
 *               type: string
 *           example:
 *             chatId: "group_chat_id"
 *             chatName: "New Group Chat Name"
 *     responses:
 *       200:
 *         description: Group chat renamed successfully.
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
 *               description: Information about the updated group chat.
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
router.put('/rename', auth, renameGroup);

/**
 * @swagger
 * /removeFromGrp:
 *   put:
 *     summary: Remove a user from a group chat
 *     description: Remove a user from an existing group chat.
 *     tags:
 *       - Chat
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: chatId
 *         in: body
 *         description: The ID of the group chat from which to remove the user.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             chatId:
 *               type: string
 *             userId:
 *               type: string
 *           example:
 *             chatId: "group_chat_id"
 *             userId: "user_id_to_remove"
 *     responses:
 *       200:
 *         description: User removed from group chat successfully.
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
 *               description: Information about the updated group chat after user removal.
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
router.put('/groupRemove', auth, removeFromGrp);

/**
 * @swagger
 * /addToGroup:
 *   put:
 *     summary: Add a user to a group chat
 *     description: Add a user to an existing group chat.
 *     tags:
 *       - Chat
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: chatId
 *         in: body
 *         description: The ID of the group chat to which to add the user.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             chatId:
 *               type: string
 *             userId:
 *               type: string
 *           example:
 *             chatId: "group_chat_id"
 *             userId: "user_id_to_add"
 *     responses:
 *       200:
 *         description: User added to group chat successfully.
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
 *               description: Information about the updated group chat after user addition.
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
router.put('/groupAdd', auth, addToGroup);

module.exports = router;