const express = require('express');
const { searchArtists } = require('../controllers/artistController'); // Importa el controlador
const router = express.Router();
const { getAllArtists, getArtistDetail } = require('../controllers/artistController');



router.get('/artists', getAllArtists); // Ruta para obtener todos los artistas
router.get('/artists/:artistId', getArtistDetail); // Ruta para obtener detalles de un artista específico
router.get('/explore', searchArtists);
router.get('/', searchArtists);

module.exports = router;
