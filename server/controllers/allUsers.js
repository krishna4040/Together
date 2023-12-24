const User = require('../models/User');

exports.getAllUsers = async (req, res) => {
    try {
        const { id } = req.user;
        const users = await User.find({ _id: { $ne: id } }).populate('profileDetails').exec();
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

exports.search = async (req, res) => {
    try {
        const { userName } = req.query;
        if (!userName) {
            throw new Error('userName not found');
        }
        const user = await User.find({ userName }).populate('profileDetails').exec();
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

exports.getUserNameSuggestions = async (req, res) => {
    try {
        const { q } = req.query;
        const regex = new RegExp(q, 'i');
        const suggestions = await User.find({ userName: regex })
            .select('userName email')
            .populate({
                path: 'profileDetails',
                select: 'pfp'
            });
        res.status(200).json({
            success: true,
            message: 'suggestions fecthed',
            data: suggestions
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}