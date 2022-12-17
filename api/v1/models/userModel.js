const mongoose = require('mongoose');


const userModel = mongoose.Schema ({
    fullName: {
        type: String
    },
    phoneNumber: {
        type: Number
    },
    username: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        unique:true,
        required: [true, 'Please, fill an email address']
    },
    profileImage: {
        type: String
    },
    password: {
        type: String,
        required: [true, 'Password cannot be blank']
    },
    confirmPassword: {
        type: String,
        required: [true, 'Confirm Password cannot be blank']
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    verificationCode: String,
    isVerified: {
        type: Boolean,
        default: false,
    },
});


const User = mongoose.model('User', userModel);

module.exports = User;
















module.exports = {
    users
}