const express = require('express');
const { getAllArtists, getArtistDetail , searchArtists} = require('../controllers/artistController');
const router = express.Router();

// Ruta para buscar artistas

router.get('/artists', getAllArtists); // Ruta para obtener todos los artistas
router.get('/artists/:artistId', getArtistDetail); // Ruta para obtener detalles de un artista específico


router.get('/explore', searchArtists);
router.get('/', searchArtists);

module.exports = router;
