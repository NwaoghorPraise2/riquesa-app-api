const User = require('../models/userModel');
const AppError = require('../utils/appError');
const {asyncHandler} = require('../utils/index');

//confirm Password Middleware
const confirmPassword = asyncHandler(async (req, res, next) => {
   if (req.body.password !== req.body.confirmPassword)
      return next(new AppError('Password and Confirm Password are not the same', 400));
   next();
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
   confirmPassword,
   getAllUsers,
};
