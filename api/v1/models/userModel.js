import {Schema, model} from 'mongoose';
import bcrypt from 'bcrypt';

const userModel = Schema({
   fullName: {
      type: String,
   },
   phoneNumber: {
      type: Number,
   },
   username: {
      type: String,
      unique: [true, 'This username has already been used'],
      required: [true, 'Please choose a username'],
   },
   email: {
      type: String,
      unique: true,
      required: [true, 'Please, fill an email address'],
      minlength: 8,
   },
   profileImage: {
      type: String,
   },
   password: {
      type: String,
      required: [true, 'Password cannot be blank'],
      select: false,
   },
   passwordConfirm: {
      type: String,
      required: [true, 'Password confirm cannot be blank'],
      validate: {
         validator: function (val) {
            return val === this.password;
         },
         message: 'Password must be same as PasswordConfirm',
      },
   },
   userRole: {
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
   console.log(this);
   if (!this.isModified('password')) return next();
   this.password = await bcrypt.hash(this.password, Number(process.env.SALT));

   this.passwordConfirm = undefined;
   next();
});

const User = model('User', userModel);

export default User;
