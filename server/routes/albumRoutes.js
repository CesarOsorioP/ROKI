const express = require('express');
const router = express.Router();
const { searchAlbums } = require('../controllers/albumController');

router.get('/explore', searchAlbums);

module.exports = router;
