const userRoutes = require('./routes/userRoute');
const app = require('../../app');

app.use('/api/v1', userRoutes);
