const express = require('express');
const router = express.Router();
const { searchSong, getAllSongs, getSongsByAlbum, deleteSong, getSongsByArtist, getSongsByGenre } = require('../controllers/songController');

router.get('/explore', searchSong);
router.get('/', getAllSongs);
router.get('/album/:albumId', getSongsByAlbum);
router.delete('/:id', deleteSong);
router.get('/artist/:artistId', getSongsByArtist);
router.get('/genre/:genre', getSongsByGenre); // Nueva ruta para filtrar por género

module.exports = router;
