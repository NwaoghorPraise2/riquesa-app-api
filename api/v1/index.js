const AppError = require('./utils/appError');
const {globalErrorHandler} = require('./middlewares/index');

const userRoutes = require('./routes/userRoute');
const app = require('../../app');

app.use('/api/v1', userRoutes);

app.all('*', (req, res, next) => {
   next(new AppError(`We do not have this route ${req.originalUrl} on our server`, 404));
});

app.use(globalErrorHandler);
