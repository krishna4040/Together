const express = require('express');
const router = express.Router();

const { auth } = require('../middlewares/auth');
const { createPost, deletePost, likePost, commentPost, likedPostByaUser, getPostComment, unlikePost } = require('../controllers/post');

// Post Routes
router.post('/createPost', auth, createPost);
router.delete('/deletePost', auth, deletePost);
router.post('/likePost', auth, likePost);
router.post('/unlikePost', unlikePost);
router.get('/allLikedPost', auth, likedPostByaUser);
router.get('/getPostComments', getPostComment);
router.post('/commentPost', auth, commentPost);

module.exports = router;