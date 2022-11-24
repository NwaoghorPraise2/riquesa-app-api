const routes = require('./routes/userRoute');
const app = require('../../app');


app.use('/api/v1', routes);