/* eslint-disable import/extensions */
import User from '../models/userModel.js';
import asyncHandler from '../utils/catchAsync.js';
import signToken from '../middlewares/authmiddleware.js';

const signup = asyncHandler(async (req, res, next) => {
   const newUser = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
   });

   const accessToken = signToken(newUser._id);
   res.status(201).json({
      status: 'Success',
      message: 'User created successfully!',
      accessToken,
      data: {
         user: newUser,
      },
   });
});

export default signup;
