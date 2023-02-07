/* eslint-disable import/extensions */
import express from 'express';
import {config} from 'dotenv';
import morgan from 'morgan';
import * as fs from 'fs';
import * as path from 'path';
import {fileURLToPath} from 'url';
import loadApi from './api/v1/index.js';

config();

//Initiallized express
const app = express();

//Logger middleware setup and Custom Middleware
if (process.env.NODE_ENV === 'development') {
   app.use(morgan('dev'));
}

//Middlewares
app.use(express.json());

//api versioning custom middleware
app.use(async (req, res, next) => {
   let version = req.url.match(/\/api\/(v[0-9]+).*/) || [];
   version = version[1] || '';

   if (version !== '') {
      const __dirname = path.dirname(fileURLToPath(import.meta.url));
      console.log(__dirname);
      const appPath = path.join(__dirname, `/api/${version}/index.js`);
      console.log(appPath);

      if (!fs.existsSync(appPath)) {
       return res.status(404).json({
         status: 'fail',
         message: `This ${version} is not registered on this API`
       })
      }

   await import(appPath).then(app);
   } else {
      app.use(express.static('client'));
   }
   next();
});

export default app;
