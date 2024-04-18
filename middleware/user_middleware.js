const UserModel = require("../models/user_models");
const { generateUserID, generateUniqueID } = require("../services/auth_services");
const { check, validationResult } = require("express-validator");

class UserMiddleware {
    // checks email is valid or not
    static validateEmail() {
        return [
            check('email').isEmail().withMessage('Invalid email address'),
        (req, res, next) => {
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
            return res.status(400).json({ 
              code: 400,
              success: false,
              errors: errors.array(),
          });
      }
      return next();
    }]
}

    // Check if any [email] is associated with existing user.
    static async emailExist({ email }){
        return await UserModel.findOne({ email });
    }
    
    
    // Check if any mobile_number is associated with existing user.
    static async mobileNumberExist({ mobile_number }) {
        return await UserModel.findOne({ mobile_number });
    } 

    static async addUserMiddleware({ email, mobile_number, password, roles, createdBy }){
        try {
           const isEmailExist = await UserMiddleware.emailExist({ email: email });
           const isMobileNumberExist = await UserMiddleware.mobileNumberExist({ mobile_number: mobile_number });
           if (isEmailExist) {
            return {
                code: 409,
                success: false,
                error: {
                    message: `${email} address already in use.`,
                }
            }
        }

        if (isMobileNumberExist) {
            return  {
                code: 409,
                success: false,
                error: {
                    message: `${mobile_number} already in use.`,
                }
            }
        }

        if (!isEmailExist && !isMobileNumberExist) {
            const userID = await generateUniqueID({ roles: roles });
            if (password === null || password.trim() === ''|| password === undefined) {
                password = "bohiba2023"
            }
            const userData = new UserModel({
                user_id: userID,
                email: email,
                mobile_number: mobile_number,
                password: password,
                roles: roles,
                createdBy: createdBy,
                createdAt: new Date().toString
            });
            var result = await userData.save();
            return {
                code: 201,
                success: true, 
                data: result,
            }
        }
    } catch (error) {
        return {
            code: 500,
            success: false,
            error: {
                message: "Someting went wrong while adding user."
            },
        }
    }
}
}
module.exports = UserMiddleware;