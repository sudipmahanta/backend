const express = require('express');
const body_parser = require('body-parser');
const UserRoute = require('./routes/authRoute');
const LoadRoute = require('./routes/loadRoute');
// const UserDashRouter = require('./routes/userDashRoute');
const VehcileDashRouter = require('./routes/vehicleDashRoute');

const app = express();

app.use(body_parser.json());
app.use('/', UserRoute);
app.use('/', LoadRoute);
// app.use('/', UserDashRouter);
app.use('/', VehcileDashRouter);

module.exports = app;