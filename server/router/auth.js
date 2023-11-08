const express = require('express');
const router = express.Router();

const { signup, sendotp, login } = require('../controllers/auth');

// Auth Routes
/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Sign up a new user
 *     description: Creates a new user account by providing necessary information and email verification.
 *     tags:
 *       - Auth
 *     requestBody:
 *         description: User information and OTP for signup.
 *         required: true
 *         content:
 *             application/json:
 *                 schema:
 *                   type: object
 *                   properties:
 *                     userName:
 *                       type: string
 *                       description: The username of the user.
 *                     email:
 *                       type: string
 *                       description: The email address of the user.
 *                     password:
 *                       type: string
 *                       description: The user's password (should be hashed on the client-side).
 *                     otp:
 *                       type: string
 *                       description: The OTP received for email verification.
 *     responses:
 *       200:
 *         description: User signed up successfully.
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *               description: Indicates if the operation was successful (true for success).
 *             message:
 *               type: string
 *               description: A success message.
 *       400:
 *         description: Invalid request data or missing fields.
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *               description: Indicates if the operation failed (false for failure).
 *             message:
 *               type: string
 *               description: An error message describing the issue with the request data.
 *       500:
 *         description: Internal server error.
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *               description: Indicates if the operation failed (false for failure).
 *             message:
 *               type: string
 *               description: An error message describing the internal server error.
 */
router.post('/signup', signup);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: User login
 *     description: Allows users to log in by providing their email and password, and issues an authentication token.
 *     tags:
 *       - Auth
 *     requestBody:
 *       description: User email and password for login.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email address for login.
 *               password:
 *                 type: string
 *                 description: The user's password (should be hashed on the client-side).
 *     responses:
 *       200:
 *         description: User logged in successfully, and a token is issued.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the operation was successful (true for success).
 *                 message:
 *                   type: string
 *                   description: A success message.
 *                 token:
 *                   type: string
 *                   description: Authentication token for the logged-in user.
 *       400:
 *         description: Invalid request data or missing fields.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the operation failed (false for failure).
 *                 message:
 *                   type: string
 *                   description: An error message describing the issue with the request data.
 *       401:
 *         description: User not signed up or incorrect password.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the operation failed (false for failure).
 *                 message:
 *                   type: string
 *                   description: An error message indicating that the user is not signed up or the password is incorrect.
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the operation failed (false for failure).
 *                 message:
 *                   type: string
 *                   description: An error message describing the internal server error.
 */

router.post('/login', login);

/**
 * @swagger
 * /auth/sendotp:
 *   post:
 *     summary: Send OTP to the user's email
 *     description: Sends a one-time password (OTP) to the provided email for user registration and verification.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email address to send the OTP to.
 *     responses:
 *       200:
 *         description: OTP created and sent successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the operation was successful (true for success).
 *                 message:
 *                   type: string
 *                   description: A success message.
 *       400:
 *         description: User with the provided email already exists.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the operation failed (false for failure).
 *                 message:
 *                   type: string
 *                   description: An error message indicating that the user already exists.
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the operation failed (false for failure).
 *                 message:
 *                   type: string
 *                   description: An error message describing the internal server error.
 */

router.post('/sendotp', sendotp);

module.exports = router;