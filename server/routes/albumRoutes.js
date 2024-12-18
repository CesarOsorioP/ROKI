const express = require('express');
const router = express.Router();
const { searchAlbums, getAlbumsByArtist, getAlbums, getAlbumById, deleteAlbum } = require('../controllers/albumController');

router.get('/explore', searchAlbums);
router.get('/artist/:id', getAlbumsByArtist);
router.get('/all', getAlbums);
router.get('/:id', getAlbumById); // Ruta para obtener un álbum por su ID
router.delete('/:id', deleteAlbum);

module.exports = router;
