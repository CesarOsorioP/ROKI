const Playlist = require('../models/Playlist');
const User = require('../models/User');
const mongoose = require('mongoose');

// Crear una nueva playlist
const createPlaylist = async (req, res) => {
  try {
    const { nombre, usuario_id, canciones, publica } = req.body;

    if (!mongoose.Types.ObjectId.isValid(usuario_id)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    const imagen_portada = req.file ? req.file.filename : null;

    const newPlaylist = new Playlist({
      nombre,
      usuario_id: new mongoose.Types.ObjectId(usuario_id),
      canciones,
      publica,
      imagen_portada,
    });

    await newPlaylist.save();
    res.status(201).json(newPlaylist);
  } catch (error) {
    console.error("Error creating playlist:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Obtener todas las playlists públicas
const getPublicPlaylists = async (req, res) => {
  try {
    const playlists = await Playlist.find({ publica: true }).populate('usuario_id', 'nombre').populate('canciones', 'nombre');
    res.json(playlists);
  } catch (error) {
    console.error("Error fetching public playlists:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Obtener playlists de un usuario
const getUserPlaylists = async (req, res) => {
  try {
    const { usuario_id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(usuario_id)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    const playlists = await Playlist.find({ usuario_id }).populate('canciones', 'nombre');
    res.json(playlists);
  } catch (error) {
    console.error("Error fetching user playlists:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Agregar una canción a una playlist
const addSongToPlaylist = async (req, res) => {
  try {
    const { playlistId, songId } = req.params;

    console.log('Playlist ID:', playlistId);
    console.log('Song ID:', songId);

    const playlist = await Playlist.findById(playlistId);

    if (!playlist) {
      return res.status(404).json({ message: "Playlist not found" });
    }

    playlist.canciones.push(songId);
    await playlist.save();
    res.json(playlist);
  } catch (error) {
    console.error("Error adding song to playlist:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// Like/Unlike una canción
const likeSong = async (req, res) => {
  try {
    const { userId, songId } = req.params;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const likedSongs = user.likedSongs || [];
    if (likedSongs.includes(songId)) {
      user.likedSongs = likedSongs.filter((id) => id !== songId);
    } else {
      user.likedSongs.push(songId);
    }

    await user.save();
    res.json(user.likedSongs);
  } catch (error) {
    console.error("Error liking/unliking song:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const deletePlaylist = async (req, res) => {
  try {
    const { playlistId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(playlistId)) {
      return res.status(400).json({ message: 'Invalid playlist ID' });
    }

    const playlist = await Playlist.findById(playlistId);

    if (!playlist) {
      return res.status(404).json({ message: "Playlist not found" });
    }

    // Eliminar la playlist
    await playlist.deleteOne();

    res.json({ message: 'Playlist deleted successfully' });
  } catch (error) {
    console.error("Error deleting playlist:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Obtener canciones de una playlist específica
const getPlaylistSongs = async (req, res) => {
  try {
    const { playlistId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(playlistId)) {
      return res.status(400).json({ message: "Invalid playlist ID" });
    }

    const playlist = await Playlist.findById(playlistId).populate({
      path: 'canciones',
      populate: {
        path: 'artista_id',
        model: 'Artist',
        select: 'nombre_artistico'
      }
    });

    if (!playlist) {
      return res.status(404).json({ message: "Playlist not found" });
    }

    res.json(playlist.canciones); // Retorna solo las canciones de la playlist
  } catch (error) {
    console.error("Error fetching songs from playlist:", error);
    res.status(500).json({ message: "Server error" });
  }
};


module.exports = {
  createPlaylist,
  getPublicPlaylists,
  getUserPlaylists,
  addSongToPlaylist,
  likeSong, deletePlaylist,
  getPlaylistSongs
};
