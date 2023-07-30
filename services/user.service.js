const UserModel = require('../models/user.model')

class UserService {
    static async registerUser(email, mobileNumber, password) {
        try {
            const registerUser = new UserModel({ email,mobileNumber,password });
            return await registerUser.save();

        } catch (error) {
            console.log(`User registration ${error}`);
        }
    }
};

module.exports = UserService;