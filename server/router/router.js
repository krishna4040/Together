const express = require('express');
const router = express.Router();

const { auth } = require('../middlewares/auth');

const { signup, sendotp, login } = require('../controllers/auth');
const { deleteUser, getUserDetails, createProfile, updateAbout, updatePfp } = require('../controllers/profile');
const { createPost, deletePost, likePost, commentPost, likedPostByaUser, getPostComment, unlikePost } = require('../controllers/post');
const { makeFriend, removeFriend, getFriendsPost } = require('../controllers/friend');
const { getAllUsers, search } = require('../controllers/allUsers');
const { accessChat, fecthChat, createGroupChat, renameGroup, addToGroup, removeFromGrp } = require('../controllers/chat');

// Auth Routes
router.post('/auth/signup', signup);
router.post('/auth/login', login);
router.post('/auth/sendotp', sendotp);

// User Routes
router.post('/user/createProfile', auth, createProfile);
router.put('/user/updatePfp', auth, updatePfp);
router.put('/user/updateAbout', auth, updateAbout);
router.delete('/user/deleteUser', auth, deleteUser);
router.get('/user/getUserDetails', auth, getUserDetails);

// AllUsers
router.get('/all-users/getAllUsers', auth, getAllUsers);
router.get('/all-users/search', search);

// Post Routes
router.post('/post/createPost', auth, createPost);
router.delete('/post/deletePost', auth, deletePost);
router.post('/post/likePost', auth, likePost);
router.post('/post/unlikePost', unlikePost);
router.get('/post/allLikedPost', auth, likedPostByaUser);
router.get('/post/getPostComments', getPostComment);
router.post('/post/commentPost', auth, commentPost);

// Friends Routes
router.put('/friends/makeFriend', auth, makeFriend);
router.put('/friends/removeFriend', auth, removeFriend);
router.get('/friends/getFriendPost', auth, getFriendsPost);

// Chat Routes
router.post('/chat/createChat', auth, accessChat);
router.get('/chat/fecthUserChats', auth, fecthChat);
router.post('/chat/group', auth, createGroupChat);
router.put('/chat/rename', auth, renameGroup);
router.put('/chat/groupRemove', auth, removeFromGrp);
router.put('/chat/groupAdd', auth, addToGroup);

module.exports = router;