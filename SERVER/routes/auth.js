const express = require('express');
const authController = require('../controllers/auth');
const authRouter = express.Router();

authRouter.post('/register', authController.registerUser); // Ensure authController.registerUser is defined
authRouter.post('/login', authController.loginUser); // Ensure authController.loginUser is defined

module.exports = authRouter;
