const mongoose = require('mongoose');
const db = require('../config/db')
const bcrypt = require('bcrypt');

const { Schema } = mongoose;

const userSchema = new Schema({
  userID:{
    type: String,
    required: true, 
    unique: true,
  },
  email: {
    type: String,
    lowercase: true,
    required: true, 
    unique: true,
  },
  userName: {
    type: String,
  },
  mobileNumber: {
    type: String,
    required: true,
    unique: true,
  },
  dob: {
    type: Date
  },
  documentDetails: {
    aadhaarNumber: {
      type: String,
      length: 19,
      unique: true,
    },
    panNumber: {
      type: String,
      length: 10,
      unique: true,
    },
  },
  
  addressDetails : {
    addressProof: {
      type: String,
    },
    houseNumber: {
      type: String,
    },
    locality: {
      type: String,
    },
    streetAddress: {
      type: String,
    },
    village: {
      type: String,
    },
    pinCode: {
      type: String,
      length: 6,
    },
    district: {
      type: String,
    },
    state: {
      type: String,
    },
    country: {
      type: String,
    },
  },
  
  bankDetails: [{
    bankName: {
      type: String,
    },
    accountNumber: {
      type: String,
    },
    ifsc: {
      type: String,
      length: 11
    }
  }],

  password: {
    type: String,
    required: true,
  },
});

userSchema.pre('save',async function() {
    try {
        var user = this;
        const salt = await bcrypt.genSalt(10);
        const hashPwd = await bcrypt.hash(user.password,salt);
        user.password = hashPwd;

    } catch (error) {
        console.log(error)
        
    }
});

userSchema.methods.comparePassword = async function(userPassword) {
  try {
    const isMatch = await bcrypt.compare(userPassword, this.password);
    console.log(`User Password: ${userPassword}`);
    return isMatch; 
  } catch (error) {
    console.log(`Error while Comparing Password ${error}`);
  }
}

const RegisterUserModel = db.model('users', userSchema);
module.exports = RegisterUserModel;
