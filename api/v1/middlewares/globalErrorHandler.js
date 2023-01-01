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
