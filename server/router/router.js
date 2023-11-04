const express = require('express');
const router = express.Router();

const { auth } = require('../middlewares/auth');

const { signup, sendotp, login } = require('../controllers/auth');
const { deleteUser, getUserDetails, createProfile, updateAbout, updatePfp } = require('../controllers/profile');
const { createPost, deletePost, likePost, commentPost, likedPostByaUser, getPostComment, unlikePost } = require('../controllers/post');
const { makeFriend, removeFriend, getFriendsPost } = require('../controllers/friend');
const { searchDatabase, searchDbByUsername } = require('../controllers/allUsers');
const { accessChat } = require('../controllers/chat');
// const { getFriendChat, addMessage } = require('../controllers/chat');

router.post('/signup', signup);
router.post('/login', login);
router.post('/sendotp', sendotp);

router.post('/createProfile', auth, createProfile);
router.post('/updatePfp', auth, updatePfp);
router.post('/updateAbout', auth, updateAbout);
router.post('/deleteUser', auth, deleteUser);
router.get('/getUserDetails', auth, getUserDetails);

router.get('/search', auth, searchDatabase);
router.post('/searchByUsername', searchDbByUsername);

router.post('/createPost', auth, createPost);
router.post('/deletePost', auth, deletePost);
router.post('/likePost', auth, likePost);
router.post('/unlikePost', unlikePost);
router.get('/allLikedPost', auth, likedPostByaUser);
router.get('/getPostComments', getPostComment);
router.post('/commentPost', auth, commentPost);

router.post('/makeFriend', auth, makeFriend);
router.post('/removeFriend', auth, removeFriend);
router.get('/getFriendPost', auth, getFriendsPost);

router.post('/createChat', auth, accessChat);
// router.get('/fecthUserChats', auth , fetchUserChats);
// router.post('/group', auth, createGroupChat);
// router.put('/rename', auth, reNameGroup);
// router.put('/groupRemove',auth, removeFromGroup);
// router.put('/groupAdd',auth, addToGroupChat);

module.exports = router;