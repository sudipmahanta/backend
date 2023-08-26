const mongoose = require('mongoose');
const db = require('../config/db');
const { Schema } = mongoose;

const vehicleSchema = new Schema({
    vehicleUUID: { 
        type:String, 
        unique: true 
    },
    vehicleNumber: { 
        type:String, 
        unique: true 
    },
    driverName: { 
        type:String, 
    },
    driverLicenseNumber: { 
        type:String, 
        unique: true 
    },
    driverMobileNumber: { 
        type:String, 
        unique: true 
    },
    vehicleWheel: { 
        type:String, 
    } 
});

const addNewVehicleSchema = new Schema ({
    userID: { 
        type:String, 
        unique: true 
    },
    allVehicles: [vehicleSchema]
});

const AddNewVehicleModel = db.model('vehicels', addNewVehicleSchema);
module.exports = AddNewVehicleModel



