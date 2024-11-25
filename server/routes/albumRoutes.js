const express = require('express');
const router = express.Router();
const { searchAlbums, getAlbumsByArtist, getAlbums, getAlbumById } = require('../controllers/albumController');

router.get('/explore', searchAlbums);
router.get('/artist', getAlbumsByArtist);
router.get('/all', getAlbums);
router.get('/:id', getAlbumById); // Ruta para obtener un álbum por su ID

module.exports = router;
