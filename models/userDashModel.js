const mongoose = require('mongoose');
const db = require('../config/db');
const { Schema } = mongoose;

const updateProfileSchema = new Schema({
    userID:{
        type: String
    },
    userName: {
        type: String,
    },
    mobileNumber: {
        type: String
    },
    email: {
        type: String
    },
    dob: {
        type: String
    }
});

const UserDashModel = mongoose.model('users', updateProfileSchema);

module.exports = UserDashModel;