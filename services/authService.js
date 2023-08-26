const UserSignUpModel = require('../models/authModel');
const jwt = require('jsonwebtoken');

class SignUpService {
    static async registerUser(userID, email, mobileNumber, password) {
        try {
            const registerUser = new UserSignUpModel({userID, email, mobileNumber, password});
            return await registerUser.save();
        } catch (error) {
            console.log(`User registration while saving\nError: ${error}`);
        }
    }

    static async signIn(userID) {
       return await UserSignUpModel.findOne({userID});
    }

    static async generateToken(tokenData, secretKey, jwt_expire) {
        return jwt.sign(tokenData, secretKey, {expiresIn:jwt_expire})
    }

};

module.exports = SignUpService;