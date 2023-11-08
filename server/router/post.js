const express = require('express');
const router = express.Router();

const { auth } = require('../middlewares/auth');
const { createPost, deletePost, likePost, commentPost, likedPostByaUser, getPostComment, unlikePost } = require('../controllers/post');

// Post Routes
/**
 * @swagger
 * /createPost:
 *   post:
 *     summary: Create a new post
 *     description: Creates a new post by providing a title, description, and an image.
 *     tags:
 *       - Post
 *     parameters:
 *       - name: body
 *         in: body
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
 *           image:
 *               type: file
 *               description: The image file for the post.
 *     consumes:
 *       - multipart/form-data
 *     responses:
 *       200:
 *         description: Post created successfully.
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
 *               description: The created post data.
 *       400:
 *         description: Invalid request data or missing fields.
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *               description: Indicates if the operation failed (false for failure).
 *             message:
 *               type: string
 *               description: An error message describing the issue with the request data.
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
router.post('/createPost', auth, createPost);

/**
 * @swagger
 * /deletePost:
 *   delete:
 *     summary: Delete a post
 *     description: Deletes a post by providing the post ID.
 *     tags:
 *       - Post
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: body
 *         in: body
 *         description: Post ID to be deleted.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             postId:
 *               type: string
 *               description: The ID of the post to be deleted.
 *     responses:
 *       200:
 *         description: Post deleted successfully.
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
router.delete('/deletePost', auth, deletePost);

/**
 * @swagger
 * /likePost:
 *   post:
 *     summary: Like a post
 *     description: Likes a post by providing the post ID.
 *     tags:
 *       - Post
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: body
 *         in: body
 *         description: Post ID to be liked.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             postId:
 *               type: string
 *               description: The ID of the post to be liked.
 *     responses:
 *       200:
 *         description: Post liked successfully.
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
router.post('/likePost', auth, likePost);

/**
 * @swagger
 * /unlikePost:
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
 * /likedPostByaUser/{id}:
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
 * /getPostComment/{postId}:
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
 * /commentPost:
 *   post:
 *     summary: Comment on a post
 *     description: Comments on a post by providing the post ID and the comment text.
 *     tags:
 *       - Post
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: body
 *         in: body
 *         description: Post ID and comment text for the comment.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             postId:
 *               type: string
 *               description: The ID of the post to comment on.
 *             comment:
 *               type: string
 *               description: The comment text.
 *     responses:
 *       200:
 *         description: Post commented successfully.
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *               description: Indicates if the operation was successful (true for success).
 *             message:
 *               type: string
 *               description: A success message.
 *       400:
 *         description: Invalid request data or missing fields.
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *               description: Indicates if the operation failed (false for failure).
 *             message:
 *               type: string
 *               description: An error message describing the issue with the request data.
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
router.post('/commentPost', auth, commentPost);

module.exports = router;