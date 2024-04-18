
const UserRouter = require('express').Router();
const UserController = require("../controllers/user_controller");
const UserMiddleware = require('../middleware/user_middleware');

UserRouter.post("/add-user", UserMiddleware.validateEmail(),UserController.addNewUser);

module.exports = UserRouter;