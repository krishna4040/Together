const express = require('express');
const router = express.Router();

const { auth } = require('../middlewares/auth');
const { createPost, deletePost, likePost, commentPost, likedPostByaUser, getPostComment, unlikePost, getPostForUser } = require('../controllers/post');

// Post Routes
/**
 * @swagger
 * /post/createPost:
 *   post:
 *     summary: Create a new post
 *     description: Creates a new post by providing a title, description, and an image.
 *     tags:
 *       - Post
 *     parameters:
 *       - name: body
 *         in: formData
 *         description: Post information including title, description, and image.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             title:
 *               type: string
 *               description: The title of the post.
 *             desc:
 *               type: string
 *               description: The description of the post.
 *             image:
 *               type: file
 *               description: The image file for the post.
 *     consumes:
 *       - multipart/form-data
 *     responses:
 *       200:
 *         description: Post created successfully.
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
 *                 data:
 *                   type: object
 *                   description: The created post data.
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
router.post('/createPost', auth, createPost);

/**
 * @swagger
 * /posts/deletePost:
 *   delete:
 *     summary: Delete a post
 *     description: Deletes a post by providing the post ID and ensuring the user has the necessary permissions.
 *     tags:
 *       - Post
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: postId
 *         in: query
 *         description: The ID of the post to delete.
 *         required: true
 *         schema:
 *           type: string
 *         example: post_id_here
 *     responses:
 *       200:
 *         description: Post deleted successfully.
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
 *       403:
 *         description: Unauthorized. The user does not have permission to delete the post.
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
 *                   description: An error message indicating the lack of permission.
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
router.delete('/deletePost', auth, deletePost);

/**
 * @swagger
 * /post/likePost:
 *   post:
 *     summary: Like a post
 *     description: Likes a post by providing the post ID.
 *     tags:
 *       - Post
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               postId:
 *                 type: string
 *                 description: The ID of the post to be liked.
 *     responses:
 *       200:
 *         description: Post liked successfully.
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
router.post('/likePost', auth, likePost);

/**
 * @swagger
 * /post/unlikePost:
 *   delete:
 *     summary: Unlike a post
 *     description: Unlikes a post by providing the post ID.
 *     tags:
 *       - Post
 *     parameters:
 *       - name: postId
 *         in: query
 *         description: The ID of the post to be unliked.
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Post unliked successfully.
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
router.delete('/unlikePost', unlikePost);

/**
 * @swagger
 * /post/likedPostByaUser/{id}:
 *   get:
 *     summary: Get liked posts by a user
 *     description: Retrieves all posts liked by a user.
 *     tags:
 *       - Post
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the user to fetch liked posts for.
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Liked posts fetched successfully.
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
 *               description: An array of posts liked by the user.
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
router.get('/allLikedPost/:id', likedPostByaUser);

/**
 * @swagger
 * /post/getPostComment/{postId}:
 *   get:
 *     summary: Get comments for a post
 *     description: Retrieves comments for a specific post by providing the post ID.
 *     tags:
 *       - Post
 *     parameters:
 *       - name: postId
 *         in: path
 *         description: The ID of the post for which to retrieve comments.
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Comments for the post fetched successfully.
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
 *               description: An array of comments for the specified post.
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
router.get('/getPostComments/:postId', getPostComment);

/**
 * @swagger
 * /post/commentPost:
 *   post:
 *     summary: Comment on a post
 *     description: Comments on a post by providing the post ID and the comment text.
 *     tags:
 *       - Post
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               postId:
 *                 type: string
 *                 description: The ID of the post to comment on.
 *               comment:
 *                 type: string
 *                 description: The comment text.
 *     responses:
 *       200:
 *         description: Post commented successfully.
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
router.post('/commentPost', auth, commentPost);

/**
 * @swagger
 * /posts/getUserPost/{userId}:
 *   get:
 *     summary: Get posts for a specific user
 *     description: Fetches posts created by a specific user based on their user ID.
 *     tags:
 *       - Post
 *     parameters:
 *       - name: userId
 *         in: path
 *         description: The ID of the user for whom to fetch posts.
 *         required: true
 *         schema:
 *           type: string
 *         example: user_id_here
 *     responses:
 *       200:
 *         description: User's posts retrieved successfully.
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
 *                 data:
 *                   type: array
 *                   description: An array of posts created by the user.
 *       400:
 *         description: Invalid user ID or missing fields.
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
router.get('/getUserPost/:userId', getPostForUser);

module.exports = router;