// routes/auth.js
const express = require('express');
const router = express.Router();
const { login, signup } = require('../controllers/authController');

// Rutas para autenticación de usuarios y administradores
router.post('/signup', signup);
router.post('/login', login);

module.exports = router;
