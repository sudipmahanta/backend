const express = require('express');
const body_parser = require('body-parser');
const UserRoute = require('./routes/authRoute');
const LoadRoute = require('./routes/loadRoute');
const UserDashRouter = require('./routes/userDashRoute');

const app = express();

app.use(body_parser.json());
app.use('/', UserRoute);
app.use('/', LoadRoute);
app.use('/', UserDashRouter);

module.exports = app;