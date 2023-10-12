const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    dob: Date,
    age: Number,
    gender: {
        type: String,
        enum: ['Male','Female','Other']
    },
    about: String,
    pfp: String,
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

console.log("profile model created");
module.exports = mongoose.model('Profile',profileSchema);