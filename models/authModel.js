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
      require: false,
      maxlength: 19,
    },
    panNumber: {
      type: String,
      require: false,
      maxlength: 10,
    },
  },
  addressDetails : {
    addressProof: {
      type: String,
      require: false,
    },
    houseNumber: {
      type: String,
      require: false,
    },
    locality: {
      type: String,
      require: false,
    },
    streetAddress: {
      type: String,
      require: false,
    },
    village: {
      type: String,
      require: false,
    },
    pinCode: {
      type: String,
      maxlength: 6,
      require: false,
    },
    district: {
      type: String,
      require: false,
    },
    state: {
      type: String,
      require: false,
    },
    country: {
      type: String,
      require: false,
    },
  },
  bankDetails: [{
    bankName: {
      type: String,
      require: false,
    },
    accountNumber: {
      type: String,
      require: false,
    },
    ifsc: {
      type: String,
      maxlength: 11,
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
    return isMatch;
  } catch (error) {
    console.log(`Error while Comparing Password ${error}`);
  }
}

const RegisterUserModel = db.model('users', userSchema);
module.exports = RegisterUserModel;
