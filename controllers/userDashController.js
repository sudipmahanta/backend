const UserDashModel = require('../models/userDashModel');

exports.updateProfile = async (req, res, next) => {

    const userID = req.params.userID;
    const {userName, email, mobilenumber, dob} = req.body;
    
    console.log(req.params.userID);

    const updateProfile = await UserDashModel.findOneAndUpdate(
        { userID: userID },
        { $set: { userName, email, mobilenumber, dob } },
        { new: true }
    ).lean();

    if (!updateProfile) {
        return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json({
        statusCode: 200, 
        status: true,
        body: {
            message: 'Message',
            updateProfile
        }})

    /*try {
        
        
    } catch (error) {
        res.status(500).json({
            statusCode: 500, 
            status: false, 
            body: {error}
        } )
    }*/
}