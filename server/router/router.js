const express = require('express');
const router = express.Router();

const { auth } = require('../middlewares/auth');

const { signup, sendotp, login } = require('../controllers/auth');
const { deleteUser, getUserDetails, createProfile, updateAbout, updatePfp } = require('../controllers/profile');
const { createPost, deletePost, likePost, commentPost, likedPostByaUser, getPostComment } = require('../controllers/post');
const { makeFriend, removeFriend, getFriendsPost } = require('../controllers/friend');
const { searchDatabase, searchDbByUsername } = require('../controllers/allUsers')

router.post('/signup', signup);
router.post('/login', login);
router.post('/sendotp', sendotp);

router.post('/createProfile', auth, createProfile);
router.post('/updatePfp', auth, updatePfp);
router.post('/updateAbout', auth, updateAbout);
router.delete('/deleteUser', auth, deleteUser);
router.get('/getUserDetails', auth, getUserDetails);

router.get('/search', searchDatabase);
router.post('/searchByUsername', searchDbByUsername);

router.post('/createPost', auth, createPost);
router.delete('/deletePost', auth, deletePost);
router.post('/likePost', auth, likePost);
router.get('/allLikedPost', auth, likedPostByaUser);
router.get('/getPostComments',getPostComment);
router.post('/commentPost', auth, commentPost);

router.post('/makeFriend', auth, makeFriend);
router.delete('/removeFriend', auth, removeFriend);
router.get('/getFriendPost', auth, getFriendsPost);

module.exports = router;