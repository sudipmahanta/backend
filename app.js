const express = require('express');
const body_parser = require('body-parser');
const session = require('express-session');
const multer = require('multer');
const path = require('path');
const UserRoute = require('./routes/auth_route');
const LoadRoute = require('./routes/loadRoute');
const VehcileDashRouter = require('./routes/vehicleDashRoute');
const MinerAuthRouter = require('./routes/miner_routes/miner_auth_route');

const app = express();
app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false}
}));

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(body_parser.json());

app.use('/', MinerAuthRouter);
app.use('/', UserRoute);
app.use('/', LoadRoute);
// app.use('/', UserDashRouter);
app.use('/', VehcileDashRouter);

module.exports = app;