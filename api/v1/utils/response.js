//reuseable functions
import signToken from '../middlewares/authmiddleware';

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
