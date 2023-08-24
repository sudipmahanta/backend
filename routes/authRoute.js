const router = require('express').Router();
const AuthController = require('../controllers/authController')

router.post('/signup', AuthController.signUp);
router.post('/signin', AuthController.signIn);
module.exports = router;