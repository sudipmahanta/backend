const express  = require("express");
const UserRouter = require("./routes/user_router");
const session = require("express-session");
const bodyParser = require("body-parser");

const app = express();
app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false}
}));

app.use(bodyParser.json());
app.use('/', UserRouter);

module.exports = app;