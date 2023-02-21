// eslint-disable-next-line import/extensions
import signToken from '../middlewares/authmiddleware.js';

//Response Sender fro authcontroller
const authResponseSender = (res, user, statusCode, message) => {
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

//Response sender for userController
const userResponseSender = (res, user, statusCode, message) => {
   res.status(statusCode).json({
      status: 'Success',
      message: message,
      data: {
         user: user,
      },
   });
};

export {authResponseSender, userResponseSender};
