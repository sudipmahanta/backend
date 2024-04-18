const mongoose = require("mongoose");
const db = require("../config/db");
const bcrypt = require("bcrypt");

const { Schema } = mongoose;

const userSchema = new Schema({
    user_id:{
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: false,
    },
    mobile_number: {
        type: String,
    },
    password: {
        type: String,
        required: false,
    },
    roles: {
        type: String,
        required: false,
    },
    createdBy: {
        type: String,
        required: false,
    },
    createdAt: {
        type: String,
        required: false,
        timestamps: true,
    }
});

// encrypt user password 
userSchema.pre('save', async function() {
    try {
        var user = this;
        const salt = await bcrypt.genSalt(10);
        const hashPwd = bcrypt.hash(user.password, salt);
        user.password = hashPwd;

    } catch (error) {
        console.log(error)   
    }
});


const UserModel = db.model('users', userSchema);
module.exports = UserModel