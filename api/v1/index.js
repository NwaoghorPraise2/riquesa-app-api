/* eslint-disable import/extensions */
import app from '../../app.js';
import AppError from './utils/appError.js';
import globalErrorHandler from './middlewares/globalErrorHandler.js';
import userRoutes from './routes/userRoute.js';
import authRoutes from './routes/authRoute.js';

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/user', userRoutes);

app.all('*', (req, res, next) => {
   next(new AppError(`This route ${req.originalUrl} doesnot exist on this server`, 404));
});

app.use(globalErrorHandler);
