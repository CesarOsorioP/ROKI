const express = require('express');
const router = express.Router();
const upload = require('../middleware/multer'); // Importa el middleware de multer
const uploadController = require('../controllers/uploadController'); // Importa el controlador de subida

// Ruta para subir canciones
router.post('/song', upload.fields([{ name: 'imagen', maxCount: 1 }, { name: 'audio', maxCount: 1 }]), uploadController.uploadSong);

module.exports = router;
