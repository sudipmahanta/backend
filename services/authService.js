const UserSignUpModel = require('../models/authModel');
const GenerateUniqueID = require('../helper/helper');
const jwt = require('jsonwebtoken');

class SignUpService {
    static async registerUser(userID, email, mobileNumber, password) {
        try {
            const userID =  GenerateUniqueID.generatedUserID.toString();
            const registerUser = new UserSignUpModel({userID, email, mobileNumber, password});
            return await registerUser.save();

        } catch (error) {
            console.log(`User registration while saving\nError: ${error}`);
        }
    }

    static async signIn(userID) {
        try {
            return await UserSignUpModel.findOne({userID});
        } catch (error) {
            console.log(error);
        }
    }

    static async generateToken(tokenData, secretKey, jwt_expire) {
        return jwt.sign(tokenData, secretKey, {expiresIn:jwt_expire})
    }

};



module.exports = SignUpService;