// routes/auth.js
const express = require('express');
const router = express.Router();
const { login, signup } = require('../controllers/authController');
const { changePassword, forgotPassword , resetPassword} = require('../controllers/authController');

// Ruta para cambiar contraseña
router.post('/change-password', changePassword);

// Ruta para recuperar contraseña
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

module.exports = router;

// Rutas para autenticación de usuarios y administradores
router.post('/signup', signup);
router.post('/login', login);

module.exports = router;
