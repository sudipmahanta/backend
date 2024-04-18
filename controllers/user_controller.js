
const UserMiddleware = require("../middleware/user_middleware");

class UserController {
  static async addNewUser(req, res) {
    const { email, mobile_number, password, roles, createdBy } = req.body;
    var response = await UserMiddleware.addUserMiddleware({
      email: email,
      mobile_number: mobile_number,
      password: password,
      roles: roles,
      createdBy: createdBy,
    });
    if (response.success) {
      res.status(response.code).json({
        code: response.code,
        success: response.success,
        data: response.data,
      });
    } else {
      res.status(response.code).json({
        code: response.code,
        success: response.success,
        error: {
          message: response.error.message,
        },
      })
    }
  }

}

module.exports = UserController;
