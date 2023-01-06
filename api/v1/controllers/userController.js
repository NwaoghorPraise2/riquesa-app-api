const User = require('../models/userModel');
const AppError = require('../utils/appError');
const asyncHandler = require('../utils/catchAsync');

//confirm Password Middleware
const confirmPassword = asyncHandler(async (req, res, next) => {
   if (req.body.password !== req.body.confirmPassword)
      return next(new AppError('Password and Confirm Password are not the same', 400));
   next();
});

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

module.exports = {
   createUser,
   confirmPassword,
   getAllUsers,
};
