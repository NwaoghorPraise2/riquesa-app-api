/* eslint-disable import/extensions */
import User from '../models/userModel.js';
import asyncHandler from '../utils/catchAsync.js';
import AppError from '../utils/appError.js';
import {authResponseSender} from '../utils/response.js';

// Route --------- POST api/v1/auth/signup
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
   authResponseSender(res, newUser, 201, 'User created successfully');
});

// Route --------- POST api/v1/auth/login
// Description --- Log users in
// Access -------- Public
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

   const {password, ...others} = User._doc;
   //send response
   authResponseSender(res, others, 200, 'Login Successful');
});

export {signup, login};
