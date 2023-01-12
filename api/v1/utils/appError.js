/*Global Error Class that extends from the normal Express Error class*/
class appError extends Error {
   constructor(message, statusCode) {
      super(message);

      this.statusCode = statusCode;
      this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
      this.isOperational = true;

      Error.captureStackTrace(this, this.constructor);
   }
}

export default appError;
