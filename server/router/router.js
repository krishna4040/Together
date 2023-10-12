const express = require('express');
const router = express.Router();

const { auth } = require('../middlewares/auth');

const { signup, sendotp, login } = require('../controllers/auth');
const { deleteUser, getUserDetails, createProfile } = require('../controllers/profile');
const { createPost, deletePost, likePost, commentPost } = require('../controllers/post');
const { makeFriend, removeFriend } = require('../controllers/friend');

router.post('/signup', signup);
router.post('/login', login);
router.post('/sendotp', sendotp);

router.post('/createProfile', auth, createProfile);
router.delete('/deleteUser', auth, deleteUser);
router.get('/getUserDetails', auth, getUserDetails);

router.post('/createPost', auth, createPost);
router.delete('/deletePost', auth, deletePost);
router.post('/likePost', auth, likePost);
router.post('/commentPost', auth, commentPost);

router.post('/makeFriend', auth, makeFriend);
router.delete('/removeFriend', auth, removeFriend);

module.exports = router;