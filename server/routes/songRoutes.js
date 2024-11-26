const express = require('express');
const router = express.Router();
const { searchSong, getAllSongs, getSongsByAlbum, deleteSong, getSongsByArtist } = require('../controllers/songController');

router.get('/explore', searchSong);
router.get('/', getAllSongs);
router.get('/album/:albumId', getSongsByAlbum); // Nueva ruta para obtener canciones por álbum
router.delete('/:id', deleteSong);
router.get('/artist/:artistId', getSongsByArtist);

module.exports = router;
