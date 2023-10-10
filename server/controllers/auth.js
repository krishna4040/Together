const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();
const User = require('../models/User');

exports.sigup = async (req,res) => {
    try {
        const {userName , email, password} = req.body;
        if (!userName || !email || !password) {
            throw new Error('All fields are required');
        }
        const check = await User.find({email});
        if (check) {
            throw new Error('User already signed in');
        }
        const hash = await bcrypt.hash(password,10);
        const user = await User.create({userName,email,password:hash});
        if (!user) {
            throw new Error('smth went wring while signing up');
        }
        res.status(200).json({
            success : true,
            message: 'user signed up successfully'
        });
    } catch (error) {
        res.status(500).json({
            success : false,
            message: error
        })
    }
}

exports.login = async (req,res) => {
    try {
        const {email , password} = req.body;
        if (!userName || !password) {
            throw new Error('All feilds are requiered');
        }
        const check = await User.findOne({email});
        if (!check) { 
            throw new Error('User not signed up');
        }
        const compare = bcrypt.compare(password,check.password);
        if (!compare) {
            throw new Error('Password do not macth');
        }
        const payload = {
            id: check._id,
            userName: check.userName,
            email: check.email,
            password: check.password
        }
        const token = jwt.sign(payload , process.env.JWT_SECRET);
        res.cookie('token',token).status(200).json({
            success: true,
            message: 'user signed in successfully'
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error
        });
    }
}