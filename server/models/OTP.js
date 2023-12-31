const mongoose = require('mongoose');
const { sendMail } = require('../utils/nodemailer');
const { template } = require('../utils/template');
const otpGenerator = require('otp-generator');

/**
 * @swagger
 * components:
 *   schemas:
 *     OTP:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           required: true
 *           description: The email address associated with the OTP.
 *         otp:
 *           type: string
 *           required: true
 *           description: The OTP (One-Time Password) value.
 *         createdAt:
 *           type: string
 *           format: date-time
 *           default: Date.now
 *           expires: 300
 *           description: The date and time when the OTP was created. The OTP document will expire after 300 seconds (5 minutes).
 */

const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 300, // The OTP document will expire after 300 seconds (5 minutes)
    },
});

otpSchema.pre('save', async function (next) {
    if (this.isNew) {
        await sendMail(this.email, 'Verification Email', template(this.otp));
        next();
    }
})

module.exports = mongoose.model('OTP', otpSchema);