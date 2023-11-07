const express = require('express');
const router = express.Router();

const { auth } = require('../middlewares/auth');
const { accessChat, fecthChat, createGroupChat, renameGroup, addToGroup, removeFromGrp } = require('../controllers/chat');

// Chat Routes
router.post('/createChat', auth, accessChat);
router.get('/fecthUserChats', auth, fecthChat);
router.post('/group', auth, createGroupChat);
router.put('/rename', auth, renameGroup);
router.put('/groupRemove', auth, removeFromGrp);
router.put('/groupAdd', auth, addToGroup);

module.exports = router;