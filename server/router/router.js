const express = require('express');
const router = express.Router();

const { auth } = require('../middlewares/auth');

const { signup, sendotp, login } = require('../controllers/auth');
const { updateProfile, deleteUser, getUserDetails } = require('../controllers/profile');
const { createPost, deletePost, likePost, commentPost } = require('../controllers/post');
const { makeFriend, removeFriend } = require('../controllers/friend');

router.post('/signup',signup);
router.post('/login',login);
router.post('/sendotp',sendotp);

router.post('/updateProfile',updateProfile);
router.delete('/deleteUser',deleteUser);
router.get('/getUserDetails',getUserDetails);

router.post('/createPost',createPost);
router.delete('/deletePost',deletePost);
router.post('/likePost',likePost);
router.post('/commentPost',commentPost);

router.post('/makeFriend',makeFriend);
router.delete('/removeFriend',removeFriend);

module.exports = router;