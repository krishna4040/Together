const express = require('express');
const router = express.Router();

const { auth } = require('../middlewares/auth');
const { deleteUser, getUserDetails, createProfile, updateAbout, updatePfp } = require('../controllers/profile');

// User Routes
router.post('/createProfile', auth, createProfile);
router.put('/updatePfp', auth, updatePfp);
router.put('/updateAbout', auth, updateAbout);
router.delete('/deleteUser', auth, deleteUser);
router.get('/getUserDetails', auth, getUserDetails);

module.exports = router;