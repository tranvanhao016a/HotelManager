const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');

const authController = new AuthController();

router.post('/register', authController.register.bind(authController));
router.post('/login', authController.login.bind(authController));
router.post('/reset-password', authController.resetPassword.bind(authController));
router.put('/update-role', authController.updateRole.bind(authController));

module.exports = router;