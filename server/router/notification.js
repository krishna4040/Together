const express = require('express');
const { auth } = require('../middlewares/auth');
const { fetchNotifications } = require('../controllers/notifications');
const router = express.Router();

router.get('/fetchNotifications', auth, fetchNotifications)

module.exports = router;