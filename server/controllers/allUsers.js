const User = require('../models/User');

exports.getPublicAccounts = async (req, res) => {
    try {
        const { id } = req.user;
        const { limit } = req.query
        const currentUser = await User.findById(id)
        const allUsers = await User.find({ _id: { $ne: id } }).populate('profileDetails').populate('requests').limit(limit).exec();
        const publicAcc = allUsers.filter(user => user.profileDetails.visibility === "public" && !currentUser.friends.includes(user._id));
        if (!publicAcc) {
            throw new Error('unable to fetch users');
        }
        res.status(200).json({
            success: true,
            message: 'search database successful',
            data: publicAcc
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
        const user = await User.findOne({ userName }).populate('profileDetails').populate('requests').exec();
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
            .select('userName email _id')
            .populate({
                path: 'profileDetails',
                select: 'pfp'
            });
        res.status(200).json({
            success: true,
            message: 'suggestions fetched',
            data: suggestions
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}