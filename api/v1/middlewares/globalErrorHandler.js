const AppError = require('../utils/appError');

const sendProductionError = (err, res) => {
   const {isOperational} = err;

   if (isOperational) {
      res.status(err.statusCode).json({
         status: err.status,
         message: err.message,
      });
   } else {
      res.status(500).json({
         status: 'error',
         message: 'Something went wrong',
      });
   }
};

const sendDevelopmentError = (err, res) => {
   res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
   });
};

const sendDBValidationError = (err) => {
   const error = Object.values(err.errors).map((el) => el.message);

   const message = `Invalid data input: ${error.join('/ ')}`;
   return new AppError(message, 400);
};

module.exports = (err, req, res, next) => {
   err.statusCode = err.statusCode || 500;
   err.status = err.status || 'error';

   const envState = process.env.NODE_ENV;

   if (envState === 'production') {
      let error = err;

      if (error.name === 'ValidationError') error = sendDBValidationError(error);

      sendProductionError(err, res);
   } else if (envState === 'development') {
      sendDevelopmentError(err);
   }
};
