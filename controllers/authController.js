const AuthService = require('../services/authService');
const UserSignUpModel = require('../models/authModel');
const GenerateToken = require('../verifyWebToken')

exports.signUp = async (req, res, next) => {
    try {
        const {userID, email, mobileNumber, password } = req.body;
        const existingUser = await UserSignUpModel.findOne({ $or: [{ email }, { mobileNumber }] });

        if (existingUser) {
            return res.status(400).json({
                statusCode: 400, 
                status: false, 
                message:'User with this email/mobile number already exist.'
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                statusCode: 400,
                status: false,
                message: 'Password is too short.'
            });
        }
        
        const successResponse = await AuthService.registerUser(userID, email, mobileNumber, password);
            return res.status(200).json({
                statusCode: 200,
                status: true, 
                message: {
                  message: 'User Registered Sucessfully',
                  email: email,
                  mobileNumber: mobileNumber,
                  password: password
                },
            }
        );
    } catch (error) {
        res.status(401).json({statusCode: 200, status: true, message: error.toString()});;
    }
}

exports.signIn = async (req, res, next) => {
    try {
        const {userID, password } = req.body;
        const user = await AuthService.signIn(userID);
        const isMatch = await user.comparePassword(password);
        console.log(userID, password);
        if(!user) {
            res.status(401).json({
                statusCode: 401, 
                status: false, 
                message: "User not found"
            });
        } else if( !isMatch){
            res.status(401).json({
                statusCode: 401,
                status: false, 
                message: "Invalid Password"
            });
        } else {
            let tokenData = {_id:user._id,userID:user.userID}
            const token = await AuthService.generateToken(tokenData, "secretKey", '72h');
            
            res.status(200).json({
                statusCode: 200, 
                status: true, 
                token: token, 
                message: {
                    userID: user.userID,
                    email: user.email,
                    mobileNumber: user.mobileNumber
                }});
        }    
    } catch (error) {
        res.status(404).json({
            statusCode: 404,
            status: false,
            message: `Error While SignIn ${error}`})
    }
}