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

module.exports = (err, req, res, next) => {
   err.statusCode = err.statusCode || 500;
   err.status = err.status || 'error';

   const envState = process.env.NODE_ENV;

   if (envState === 'production') {
      sendProductionError(err, res);
   } else if (envState === 'development') {
      sendDevelopmentError(err, res);
   }
};
