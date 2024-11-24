const express = require('express');
const router = express.Router();
const { searchSong, getAllSongs } = require('../controllers/songController'); // Asegúrate de importar el controlador correcto

// Ruta para buscar canciones
router.get('/explore', searchSong);

// Ruta para obtener todas las canciones
router.get('/', getAllSongs);

module.exports = router;
