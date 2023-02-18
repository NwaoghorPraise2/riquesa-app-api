/* eslint-disable import/extensions */
import User from '../models/userModel.js';
import AppError from '../utils/appError.js';
import asyncHandler from '../utils/catchAsync.js';

const responseSender = (res, user, statusCode, message) => {
   res.status(statusCode).json({
      status: 'Success',
      message: message,
      data: {
         user: user,
      },
   });
};

const getAllUsers = asyncHandler(async (req, res, next) => {
   const users = await User.find();
   
   //send responses
   responseSender(res, user, statusCode, 'Users loaded');
});

export default {getAllUsers};
