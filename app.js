/* eslint-disable import/extensions */
import express from 'express';
import {config} from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';
import {fileURLToPath} from 'url';
import morgan from 'morgan';
import appError from './api/v1/utils/appError.js';

// Global Varaibles


config();
//Initiallized express
const app = express();

//Logger middleware setup and Custom Middleware
if (process.env.NODE_ENV === 'development') {
   app.use(morgan('dev'));
}

//Middlewares
app.use(express.json());
// app.use(express.static('client'));
app.use((req, res, next) => {
   req.requestTime = new Date().toISOString();
   next();
});

//api versioning custom middleware
app.use((req, res, next) => {
   let version = req.url.match(/\/api\/(v[0-9]+).*/) || [];
   version = version[1] || '';

   if (version !== '') {
      const __dirname = path.dirname(fileURLToPath(import.meta.url));

      console.log(__dirname);
      const appPath = path.join(__dirname, `/api/${version}/index.js`);

      console.log(appPath);

      if (!fs.existsSync(appPath)) {
         next(new appError('Route not found', 404));
      } 

      import(appPath);
   } else {
      import('./client');
   } 
   
   
   next();
});

export default app;
