const AuthService = require('../services/authService');
const UserSignUpModel = require('../models/authModel');
require('dotenv').config();

async function signUp(req, res, next) {
    try {
        const {userID, email, mobileNumber, password } = req.body;
        const existingUser = await UserSignUpModel.findOne({ $or: [{ email }, { mobileNumber }] });

        if (existingUser) {
            return res.status(400).json({
                successCode: 400, 
                success: false, 
                body:'User with this email/mobile number already exist.'
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                successCode: 400,
                success: false,
                body: 'Password is too short.'
            });
        }
        
        const successResponse = await AuthService.registerUser(userID, email, mobileNumber, password);
        console.log(successResponse)
            return res.status(200).json({
                successCode: 200,
                success: true, 
                body: successResponse,
            }
        );    
    } catch (error) {
        res.status(401).json({successCode: 401, success: false, body: error});;
    }
}

async function signIn(req, res, next) {
    
    try {
        const {userID, password } = req.body;
        const user = await AuthService.signIn(userID);
        const isMatch = await user.comparePassword(password);
        
        if(!user) {
            res.status(401).json({
                successCode: 401, 
                success: false, 
                body: "User not found"
            });

        } else if( !isMatch){
            res.status(401).json({
                successCode: 401,
                success: false, 
                body: "Invalid Password"
            });

        } else {
            let tokenData = {_id:user._id,userID:user.userID}
            const token = await AuthService.generateToken(tokenData, process.env.SECRET_KEY, '72h');
            
            res.status(200).json({
                successCode: 200, 
                success: true, 
                token: token, 
                body: {
                    userID: user.userID,
                    email: user.email,
                    mobileNumber: user.mobileNumber
                }
            });

        }        
    } catch (error) {
        res.status(404).json({
            statusCode: 404,
            status: false,
            message: `Error While SignIn ${error}`
        })
    }
}

module.exports = {
    signUp,
    signIn,
}