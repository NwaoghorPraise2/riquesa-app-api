const express = require('express');
const fs = require('fs');
const path = require('path');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use((req, res, next) => {
        console.log(req.url);
    let version = req.url.match(/\/api\/(v[0-9]+).*/) || [] ;
    version = version[1] || '';

    console.log(version);

    if (version !== '') {
        const appPath = path.join(__dirname, `./api/${version}/index.js`);
        console.log(appPath);
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
            status : "Sucess",
            message :"Welcome tp Client"
        });
    }
    next();
});

module.exports = app;