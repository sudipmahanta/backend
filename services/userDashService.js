const UserDashModel = require('../models/userDashModel');

class UserDashService {
    static async updateUserProfile(userID, name, email, mobileNumber, dob) {
        try {
            const updateProfile = new UserDashModel({userID, name, email, mobileNumber, dob});
            return await updateProfile.updateOne(userID);
        } catch (error) {
         console.log(error);   
        }
    }
};

module.exports = UserDashService;