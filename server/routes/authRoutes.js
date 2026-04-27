const express = require('express');
const router = express.Router();
const { signup, login, verifier, logout } = require('../controllers/authController');
const authMiddleware = require('../middleware/authmiddleware');

router
    .get('/me',authMiddleware, verifier)
    .post('/signup', signup)
    .post('/login', login)
    .post('/logout', logout);

module.exports = router;