/* eslint-disable import/extensions */
import express from 'express';
import {config} from 'dotenv';
import fs from 'fs';
import {join, dirname} from 'path';
import {fileURLToPath} from 'url';
import morgan from 'morgan';
import connect from './api/v1/config/database.js';

// Global Varaibles
const __dirname = dirname(fileURLToPath(import.meta.url));

config();
//Initiallized express
const app = express();

//Logger middleware setup and Custom Middleware
if (process.env.NODE_ENV === 'development') {
   app.use(morgan('dev'));
}

//connect database (MongoDB)
connect();

//Middlewares
app.use(express.json());
app.use(express.static('client'));
app.use((req, res, next) => {
   req.requestTime = new Date().toISOString();
   next();
});

//api versioning custom middleware
app.use((req, res, next) => {
   let version = req.url.match(/\/api\/(v[0-9]+).*/) || [];
   version = version[1] || '';

   if (version !== '') {
      const appPath = join(__dirname, `./api/${version}/index.js`);

      if (!fs.existsSync(appPath)) {
         return res.status(404).json({
            status: 'Error',
            message: 'Not Found',
         });
      }
      import(appPath);
   }

   next();
});

export default app;
