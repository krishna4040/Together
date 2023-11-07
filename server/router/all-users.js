const express = require('express');
const router = express.Router();

const { auth } = require('../middlewares/auth');
const { getAllUsers, search } = require('../controllers/allUsers');

// AllUsers
router.get('/getAllUsers', auth, getAllUsers);
router.get('/search', search);

module.exports = router;