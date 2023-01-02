const User = require('../models/userModel');
const AppError = require('../utils/appError');
const {asyncHandler} = require('../utils/index');

const signup = asyncHandler(async (req, res, next) => {
    // const {email} = req.body;
    // const userExist = await User.findOne({email});
 
    // if (userExist) return next(new AppError('User already Exists', 403));
 
    const newUser = await User.create(req.body);
    res.status(201).json({
       status: 'success',
       message: 'User Created Successfully',
       data: {
          user: newUser,
       },
    });
 });