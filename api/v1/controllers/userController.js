const {usersModel} = require('../models/index');

const User = usersModel;

const createUser = async (req, res) => {
   try {
      const {email} = req.body;

      const userExist = await User.findOne({email});
      if (userExist) {
         res.status(403);
         throw new Error('User already Exists');
      }
      const newUser = await User.create(...req.body);
      res.status(201).json({
         status: 'success',
         message: 'User Created Successfully',
         data: {
            user: newUser,
         },
      });
      // if(!newUser) return throw new Error;
   } catch (err) {
      res.status(400).json({
         status: 'fail',
         message: err.message,
      });
   }
};

module.exports = {
   createUser,
};
