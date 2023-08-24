const express = require('express');
const router = require('express').Router();
const AuthenticateToken = require('../verifyWebToken'); 
const UserDashController = require('../controllers/userDashController');

router.put('/:userID', AuthenticateToken.verifyWebToken, UserDashController.updateProfile);
module.exports = router;