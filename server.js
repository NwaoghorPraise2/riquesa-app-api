/* eslint-disable import/extensions */
import {config} from 'dotenv';
import app from './app.js';

config();

//App Server
const PORT = process.env.PORT || 3400;
app.listen(PORT, () => {
   console.log(`Requeza on ${PORT} Server Up and Running`);
});
