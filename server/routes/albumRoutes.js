const express = require('express');
const router = express.Router();
const { searchAlbums, getAlbumsByArtist } = require('../controllers/albumController');

router.get('/explore', searchAlbums);
router.get('/', getAlbumsByArtist);

module.exports = router;
