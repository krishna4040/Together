const User = require('../models/User');

exports.searchDatabase = async (req, res) => {
    try {
        const users = await User.find({}).populate('profileDetails').exec();
        if (!users) {
            throw new Error('unable to fecth users');
        }
        res.status(200).json({
            success: true,
            message: 'search database succesfull',
            data: users
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

exports.searchDbByUsername = async (req, res) => {
    try {
        const { userName } = req.body;
        if (!userName) {
            throw new Error('userName not found');
        }
        const user = await User.find({userName});
        if (!user) {
            throw new Error('No user with given userName exist');
        }
        res.status(200).json({
            success: true,
            message: 'user found',
            data: user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}