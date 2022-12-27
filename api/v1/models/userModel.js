const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userModel = mongoose.Schema({
   fullName: {
      type: String,
   },
   phoneNumber: {
      type: Number,
   },
   username: {
      type: String,
      unique: [true, 'this username has already been used'],
      required: [true, 'Please choose a username'],
   },
   email: {
      type: String,
      unique: true,
      required: [true, 'Please, fill an email address'],
   },
   profileImage: {
      type: String,
   },
   password: {
      type: String,
      required: [true, 'Password cannot be blank'],
   },
   confirmPassword: {
      type: String,
      required: [true, 'Confirm Password cannot be blank'],
      validate: {
         validator: function (val) {
            return val === this.password;
         },
         message: 'Confirm Password does not match Password.',
      },
   },
   role: {
      type: String,
      default: 'user',
      enum: {
         values: ['user', 'admin'],
         message: 'roles has to be ethier: user or admin',
      },
   },
   resetPasswordToken: {
      type: String,
   },
   resetPasswordExpire: {
      type: Date,
   },
   verificationCode: {
      type: String,
   },
   isVerified: {
      type: Boolean,
      default: false,
   },
});

userModel.pre('save', async function (next) {
   try {
      this.password = bcrypt.hashSync(this.password, Number(process.env.SALT));
      next();
   } catch (err) {
      next(err);
   }
});

const User = mongoose.model('User', userModel);

module.exports = User;
