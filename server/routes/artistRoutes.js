const express = require('express');
const { searchArtists } = require('../controllers/artistController'); // Importa el controlador
const router = express.Router();

// Ruta para buscar artistas

router.get('/explore', searchArtists);
router.get('/', searchArtists);

module.exports = router;
