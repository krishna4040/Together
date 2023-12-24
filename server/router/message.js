const express = require('express');
const { sendMessage, allMessages } = require('../controllers/message');
const { auth } = require('../middlewares/auth')
const router = express.Router();

router.post('/sendMessage', auth, sendMessage);
router.get('/fecthMessages', allMessages);

module.exports = router;