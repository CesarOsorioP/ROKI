const express = require('express');
const router = express.Router();
const { searchSong } = require('../controllers/songController'); // Asegúrate de importar el controlador correcto

// Ruta para buscar canciones
router.get('/explore', searchSong);

module.exports = router;
