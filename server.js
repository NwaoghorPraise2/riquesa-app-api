/* eslint-disable import/extensions */
import {config} from 'dotenv';
import app from './app.js';
import connect from './api/v1/config/database.js';

config();

//App Server
const PORT = process.env.PORT || 3400;
const startServer = async () => {
   await connect.connect();
   await connect.disConnected();

   app.listen(PORT, () => {
      console.log(`Requeza on ${PORT} Server Up and Running`);
   });
};

startServer();
