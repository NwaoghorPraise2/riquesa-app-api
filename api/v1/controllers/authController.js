/* eslint-disable import/extensions */
import User from '../models/userModel.js';
import asyncHandler from '../utils/catchAsync.js';
import signToken from '../middlewares/authmiddleware.js';
import AppError from '../utils/appError.js';

//reuseable functions
const responseSender = (res, user, statusCode, message) => {
   const accessToken = signToken(user._id);
   res.status(statusCode).json({
      status: 'Success',
      message: message,
      accessToken,
      data: {
         user: user,
      },
   });
};

// Route --------- POST api/users
// Description --- Register users
// Access -------- Public
const signup = asyncHandler(async (req, res, next) => {
   const newUser = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
   });

   //send  response
   responseSender(res, newUser, 201, 'User created successfully');
});

const login = asyncHandler(async (req, res, next) => {
   const {email, username, password} = req.body;

   if (!(email || username) || !password) {
      return next(new AppError('Please, provide an Email and Password', 400));
   }

   const user = await User.findOne({
      $or: [{email}, {username}],
   }).select('+password');

   if (!user || !(await user.verifyPassword(password, user.password))) {
      return next(new AppError('Invalid Email or Password entered.', 401));
   }

   //send response
   responseSender(res, user, 200, 'Login Successful');
});

export default {signup, login};
