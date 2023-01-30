/* eslint-disable import/extensions */
import User from '../models/userModel.js';
import asyncHandler from '../utils/catchAsync.js';
import signToken from '../middlewares/authmiddleware.js';

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

const signup = asyncHandler(async (req, res, next) => {
   const newUser = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
   });
   const message = 'User created successfully';
   //send responses
   responseSender(res, newUser, 200, message);
});

export default signup;
