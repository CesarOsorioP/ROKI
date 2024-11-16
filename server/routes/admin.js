const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const checkRole = require('../middleware/checkRole'); // Asegúrate de que el middleware existe
const auth = require('../middleware/auth');

router.use(auth); // Esto asegura que todas las rutas posteriores requieran autenticación

// Rutas de administración
router.post('/create', checkRole(null), adminController.crearAdmin); // Permite a cualquier usuario crear un administrador
router.put('/:id', checkRole('administrador'), adminController.editarAdmin); // Solo para administradores

router.post('/artista', checkRole(null), adminController.crearArtista); // Solo para administradores
router.put('/artista/:id', checkRole(null), adminController.editarArtista); // Solo para administradores

router.post('/usuario', checkRole(null), adminController.crearUsuario); // Solo para administradores
router.put('/usuario/:id', checkRole(null), adminController.editarUsuario); // Solo para administradores

module.exports = router;
