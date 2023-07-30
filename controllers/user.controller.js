const UserService = require('../services/user.service');


exports.register = async (req, res, next) => {
    try {
        const { email, mobileNumber, password } = req.body;
        const successResponse = await UserService.registerUser(email, mobileNumber, password);
        console.log(`Body: ${email}`);
        res.json({ status: true, success: "Registered Sucessfully"});
    } catch (error) {
        console.log(error);
    }
}  