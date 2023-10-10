const User = require('../models/User');
const Profile = require('../models/Profile');

const {cdupload} = require('../utils/cloudinary');

exports.updateProfile = async (req,res) => {
    try {
        const {firstName , lastName , dob , gender , about} = req.body;
        const userId = req.user.id;
        const pfp = req.files.pfp;
        if (!(firstName || lastName || dob || gender || about || pfp)) {
            throw new Error('At least one feild is required');
        }
        const uploaded = await cdupload(pfp,process.env.FOLDER);
        const data = await Profile.create({
            firstName,
            lastName,
            dob,
            gender,
            about,
            age: Date.now() - dob,
            pfp: uploaded,
            user: userId
        });
        if (!data) {
            throw new Error('unable to update profile');
        }
        await User.findByIdAndUpdate(userId,{profileDeatils: data._id});
        res.status(200).json({
            success: true,
            message: 'Profile updated successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error
        });
    }
}