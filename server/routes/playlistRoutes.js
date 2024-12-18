const express = require('express');
const router = express.Router();
const multer = require('multer');

// Importar controladores
const {
  createPlaylist,
  getPublicPlaylists,
  getUserPlaylists,
  addSongToPlaylist,
  likeSong,
  deletePlaylist,
  getPlaylistSongs
} = require('../controllers/playlistController');

// Configuración de Multer para cargar archivos
const upload = multer({ dest: 'uploads/' });

/**
 * RUTAS PARA PLAYLISTS
 */

// Crear una nueva playlist
// Requiere cargar una imagen (opcional) y datos en el cuerpo de la solicitud
router.post('/create', upload.single('imagen_portada'), createPlaylist);

// Obtener todas las playlists públicas
router.get('/public', getPublicPlaylists);

// Obtener playlists de un usuario específico (por ID de usuario)
router.get('/user/:usuario_id', getUserPlaylists);

// Agregar una canción a una playlist
// Requiere los parámetros `playlistId` y `songId`
router.put('/add/:playlistId/:songId', addSongToPlaylist);

// Like/Unlike una canción para un usuario específico
// Requiere los parámetros `userId` y `songId`
router.put('/like/:userId/:songId', likeSong);

// Eliminar una playlist específica (por ID de playlist)
router.delete('/:playlistId', deletePlaylist);

// Obtener canciones de una playlist específica
router.get('/:playlistId/songs', getPlaylistSongs);


module.exports = router;
