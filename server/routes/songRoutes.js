const express = require('express');
const router = express.Router();
const { searchSong, getAllSongs, getSongsByAlbum } = require('../controllers/songController');

router.get('/explore', searchSong);
router.get('/', getAllSongs);
router.get('/album/:albumId', getSongsByAlbum); // Nueva ruta para obtener canciones por álbum

module.exports = router;
