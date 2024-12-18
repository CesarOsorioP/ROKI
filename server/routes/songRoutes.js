const express = require('express');
const router = express.Router();
const {
  searchSong,
  getAllSongs,
  getSongsByAlbum,
  deleteSong,
  getSongsByArtist,
  getSongsByGenre,
  getRandomSongs,
} = require('../controllers/songController');

router.get('/explore', searchSong);
router.get('/', getAllSongs);
router.get('/album/:albumId', getSongsByAlbum);
router.delete('/:id', deleteSong);
router.get('/artist/:artistId', getSongsByArtist);
router.get('/genre/:genre', getSongsByGenre);
router.get('/random-songs', getRandomSongs); // Asegúrate de que esta ruta esté definida

module.exports = router;
