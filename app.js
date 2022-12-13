const express = require('express');
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const morgan = require('morgan');
const connect = require('./api/v1/config/database');

//Initiallized express
const app = express();

//Logger middleware setup
if (process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

//connect database (MongoDB)
connect();

//Middlewares
app.use(express.static('client'))
app.use(express.json());
app.use((req, res, next) => {
    let version = req.url.match(/\/api\/(v[0-9]+).*/) || [] ;
    version = version[1] || '';

    if (version !== '') {
        const appPath = path.join(__dirname, `./api/${version}/index.js`);

        if (!fs.existsSync(appPath)) {
            return res.status(404).json({
                status: "Error",
                message: "Not Found"
            });
        }
        require(appPath);
    } else {
        require('./client/index');
        return res.status(200).json({
            status : "Success",
            message :"Welcome to Client"
        });
    }
    next();
});

module.exports = app;