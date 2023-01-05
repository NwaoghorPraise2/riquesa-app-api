const app = require('../../app');
const AppError = require('./utils/appError');
const {globalErrorHandler} = require('./middlewares/index');
const userRoutes = require('./routes/userRoute');

app.use('/api/v1/user', userRoutes);

app.all('*', (req, res, next) => {
   next(new AppError(`This route ${req.originalUrl} doesnot exist on this server`, 404));
});

app.use(globalErrorHandler);
