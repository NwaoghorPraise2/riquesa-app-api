const express = require('express');
require('dotenv').config();
const routes = require('./routes/userRoute');

//middlewares
const app = express();
app.use('/', routes);


//server
const PORT = process.env.PORT || 3400;
app.listen(PORT, () => {
    console.log(`Requeza on ${PORT} Server Up and Running`);
}); 