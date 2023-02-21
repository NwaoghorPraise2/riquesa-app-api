/* eslint-disable import/extensions */
import User from '../models/userModel.js';
import asyncHandler from '../utils/catchAsync.js';
import {userResponseSender} from '../utils/response.js';

const getAllUsers = asyncHandler(async (req, res, next) => {
   const users = await User.find();

   //send responses
   userResponseSender(res, users, 200, 'Users loaded');
});

export default {getAllUsers};
