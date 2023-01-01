const {usersModel} = require('../models/index');
const {asyncHandler, appError} = require('../utils/index');

const User = usersModel;

//confirm Password Middleware
const confirmPassword = async (req, res, next) => {
   try {
      if (req.body.password !== req.body.confirmPassword)
         return res.status(400).json({
            success: 'fail',
            message: 'Password and Confirm Password are not the same',
         });
      next();
   } catch (err) {
      next(err);
   }
};

const createUser = asyncHandler(async (req, res, next) => {
      const {email} = req.body;

      const userExist = await User.findOne({email});
      if (userExist) {
         next( new appError('User already Exists', 403));
      }

      const newUser = await User.create(req.body);
      if (!newUser) throw new Error('User was not created');

      res.status(201).json({
         status: 'success',
         message: 'User Created Successfully',
         data: {
            user: newUser,
         },
      });
});

const getAllUsers = async (req, res) => {
   try {
      const users = await User.find();
      if (!users) throw new Error('Users not found');

      res.status(200).json({
         status: 'Success',
         message: 'users found',
         data: {
            users,
         },
      });
   } catch (err) {
      res.status(400).json({
         status: 'fail',
         message: err.message,
      });
   }
};

module.exports = {
   createUser,
   confirmPassword,
   getAllUsers,
};
