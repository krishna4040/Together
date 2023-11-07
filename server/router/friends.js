const express = require('express');
const router = express.Router();

const { auth } = require('../middlewares/auth');
const { makeFriend, removeFriend, getFriendsPost } = require('../controllers/friend');

// Friends Routes
router.put('/makeFriend', auth, makeFriend);
router.put('/removeFriend', auth, removeFriend);
router.get('/getFriendPost', auth, getFriendsPost);

module.exports = router;