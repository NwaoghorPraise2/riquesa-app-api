const {usersModel} = require('../models/index');

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

const createUser = async (req, res) => {
   try {
      const {email} = req.body;

      const userExist = await User.findOne({email});
      if (userExist) {
         res.status(403);
         throw new Error('User already Exists');
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
};
