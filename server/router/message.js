const express = require('express');
const { sendMessage, allMessages } = require('../controllers/message');
const { auth } = require('../middlewares/auth')
const router = express.Router();

/**
 * @swagger
 * /message/sendMessage:
 *   post:
 *     summary: Send a message to a chat.
 *     description: Sends a message to a specified chat.
 *     tags:
 *        - Message
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 description: Content of the message.
 *               chatId:
 *                 type: string
 *                 description: ID of the chat where the message will be sent.
 *     responses:
 *       '200':
 *         description: Successful response after sending the message.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the message was sent successfully.
 *                 data:
 *                   $ref: '#/components/schemas/Message'
 *                   description: Details of the sent message.
 *                 message:
 *                   type: string
 *                   description: Informational message regarding the status.
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
 *                 error:
 *                   type: string
 *                   description: Error message describing the failure.
 */
router.post('/sendMessage', auth, sendMessage);

/**
 * @swagger
 * /message/fetchMessages/{chatId}:
 *   get:
 *     summary: Get all messages in a specific chat.
 *     description: Retrieves all messages associated with a specific chat.
 *     tags:
 *       - Message
 *     parameters:
 *       - in: path
 *         name: chatId
 *         description: ID of the chat to retrieve messages from.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful response with all messages in the chat.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the request was successful.
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Message'
 *                   description: List of messages in the specified chat.
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
 *                 error:
 *                   type: string
 *                   description: Error message describing the failure.
 */
router.get('/fetchMessages/:chatId', allMessages);

module.exports = router;