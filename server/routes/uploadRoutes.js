const express = require('express');
const router = express.Router();
const upload = require('../config/uploadConfig');
const uploadController = require('../controllers/uploadController');

// Ruta para subir un álbum o EP (una imagen por álbum), sin middleware auth
router.post('/album', upload.single('imagen'), uploadController.uploadAlbumOrEP);

// Ruta para subir una canción (imagen y archivo de audio), sin middleware auth
router.post('/song', upload.fields([{ name: 'imagen', maxCount: 1 }, { name: 'audio', maxCount: 1 }]), uploadController.uploadSong);

module.exports = router;
