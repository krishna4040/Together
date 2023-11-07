const express = require('express');
const router = express.Router();

const { signup, sendotp, login } = require('../controllers/auth');

// Auth Routes
router.post('/signup', signup);
router.post('/login', login);
router.post('/sendotp', sendotp);

module.exports = router;