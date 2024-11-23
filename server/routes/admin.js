const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { searchUsuario } = require('../controllers/adminController'); // Importa correctamente searchUsuario

const checkRole = require('../middleware/checkRole'); // Middleware para roles
const auth = require('../middleware/auth'); // Middleware de autenticación

// Aplica autenticación a todas las rutas de este router
router.use(auth);

// **Rutas para administración de administradores**
router.post('/create', checkRole(null), adminController.crearAdmin); // Permite a cualquier usuario crear un administrador
router.put('/:id', checkRole('administrador'), adminController.editarAdmin); // Solo administradores pueden editar administradores

// **Rutas para administración de artistas**
router.post('/artista', checkRole('administrador'), adminController.crearArtista); // Solo administradores
router.put('/artista/:id', checkRole('administrador'), adminController.editarArtista); // Solo administradores

// **Rutas para administración de usuarios**
router.post('/usuario', checkRole('administrador'), adminController.crearUsuario); // Solo administradores
router.put('/usuario/:id', checkRole('administrador'), adminController.editarUsuario); // Solo administradores

// **Rutas de búsqueda y exploración**
router.get('/explore', searchUsuario); // Ruta para buscar usuarios
router.get('/', searchUsuario); // Ruta genérica para buscar usuarios

module.exports = router;
