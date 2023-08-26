const AuthService = require('../services/authService');
const UserSignUpModel = require('../models/authModel');
require('dotenv').config();

async function signUp(req, res, next) {
    
    try {
        async function generateUniqueID() {
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            let uniqueID = '';
            for (let i = 0; i < 6; i++) {
                const randomIndex = Math.floor(Math.random() * characters.length);
                uniqueID += characters.charAt(randomIndex);
            }
    
            const existingUserID = await UserSignUpModel.findOne({ uniqueID });
            if (existingUserID) {
                return generateUniqueID();
            }
            return uniqueID;
        }
        
        const {email, mobileNumber, password } = req.body;
        const uniqueID = await generateUniqueID();
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
            
        const response = await AuthService.registerUser(uniqueID, email, mobileNumber, password);
        console.log(`Signup API: ${res.statusCode}`);
            
        return res.status(200).json({
            successCode: 200,
            success: true, 
            body: response,
        });        
    } catch (error) {
        res.status(401).json({successCode: 401, success: false, body: error});;
    }
}

async function signIn(req, res, next) {
    try {
        const {userID, password} = req.body;
        const existUser = await AuthService.signIn(userID);
        
        if(!existUser) {
            return res.status(401).json({
                successCode: 401, 
                success: false, 
                body: "User not found"
            });

        }
        const isMatch = await existUser.comparePassword(password);
        if( !isMatch){
            return res.status(401).json({
                successCode: 401,
                success: false, 
                body: "Invalid Password"
            });

        } 
        
        let tokenData = {_id:existUser._id,userID:existUser.userID}
        const token = await AuthService.generateToken(tokenData, process.env.SECRET_KEY, '72h');
        
        res.status(200).json({
            successCode: 200, 
            success: true, 
            token: token, 
            body: {
                userID: existUser.userID,
                email: existUser.email,
                mobileNumber: existUser.mobileNumber
            }
        });         
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