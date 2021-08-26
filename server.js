"use strict";

const express = require("express");
const cors = require('cors');
const app = express();
const port = Number(5000);
const helmet = require("helmet");
const compression = require('compression');

let corsOpt = {
    origin: '*',
    credentials: true,
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['X-CSRF-Token', 'X-Requested-With', 'Accept', 'Accept-Version', 'Content-Length', 'Content-MD5', 'Content-Type', 'Date', 'X-Api-Version'],
    optionsSuccessStatus: 204
};

app.use(helmet());
app.use(cors(corsOpt));
app.use(compression());

app.get("/", (req, res, next) => {
    res.status(200);
    res.send('<head><title>CDN &bull; FyreNodes</title></head><body><h2>Welcome to FyreCDN!</h2><h4>Please specify a file path.</h4></body>');
    next();
});

app.use('/data', require('./router'));

app.listen(port, () => console.log(`[INFO] CDN Online.`));
