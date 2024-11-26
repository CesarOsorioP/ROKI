const express = require('express');
const router = express.Router();
const multer = require('multer');
const { createPlaylist, getPublicPlaylists, getUserPlaylists, addSongToPlaylist, likeSong } = require('../controllers/playlistController');

const upload = multer({ dest: 'uploads/' });

router.post('/create', upload.single('imagen_portada'), createPlaylist);
router.get('/public', getPublicPlaylists);
router.get('/user/:usuario_id', getUserPlaylists);
router.put('/add/:playlistId/:songId', addSongToPlaylist);
router.put('/like/:userId/:songId', likeSong);

module.exports = router;
