/* eslint-disable import/extensions */
import User from '../models/userModel.js';
import AppError from '../utils/appError.js';
import asyncHandler from '../utils/catchAsync.js';

const createUser = asyncHandler(async (req, res, next) => {
   const {email} = req.body;
   const userExist = await User.findOne({email});

   if (userExist) return next(new AppError('User already Exists', 403));

   const newUser = await User.create(req.body);
   res.status(201).json({
      status: 'success',
      message: 'User Created Successfully',
      data: {
         user: newUser,
      },
   });
});

const getAllUsers = asyncHandler(async (req, res, next) => {
   const users = await User.find();
   res.status(200).json({
      status: 'Success',
      message: 'users found',
      data: {
         users,
      },
   });
});

export default {getAllUsers, createUser};
