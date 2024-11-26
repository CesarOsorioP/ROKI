const express = require('express');
const router = express.Router();
const { getCurrentSong, getNextSong, getPreviousSong } = require('../controllers/playerController');

router.get('/current', getCurrentSong); // Ruta para obtener la canción actual
router.get('/next', getNextSong); // Ruta para obtener la próxima canción
router.get('/previous', getPreviousSong); // Ruta para obtener la canción anterior

module.exports = router;
