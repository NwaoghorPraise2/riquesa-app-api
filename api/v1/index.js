/* eslint-disable import/extensions */
import AppError from './utils/appError.js';
import globalErrorHandler from './middlewares/globalErrorHandler.js';
import userRoutes from './routes/userRoute.js';
import authRoutes from './routes/authRoute.js';

export default (app) => {
   //Authentication Route mounting
   app.use('/api/v1/auth', authRoutes);
   //User Resorces Route Mounting
   app.use('/api/v1/user', userRoutes);

   //This helps to return an error message a requested route is invalid.
   app.all('*', (req, res, next) => {
      next(
         new AppError(`This route ${req.originalUrl} doesnot exist on this server`, 404)
      );
   });

   app.use(globalErrorHandler);
};
