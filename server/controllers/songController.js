const Song = require('../models/Song');

// Controlador para obtener todas las canciones de un álbum
const getSongsByAlbum = async (req, res) => {
  try {
    const { albumId } = req.params;
    if (!albumId) {
      return res.status(400).json({ message: "Album ID is required" });
    }

    const songs = await Song.find({ album_id: albumId }).populate('artista_id', 'nombre_artistico');
    res.json(songs);
  } catch (error) {
    console.error("Error in getSongsByAlbum:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Controlador para obtener todas las canciones
const getAllSongs = async (req, res) => {
  try {
    const songs = await Song.find().populate('artista_id', 'nombre_artistico').exec();
    res.status(200).json(songs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener las canciones' });
  }
};

// Controlador para buscar canciones
const searchSong = async (req, res) => {
  try {
    const searchQuery = req.query.search;
    if (!searchQuery) {
      return res.status(400).json({ message: "Search query is required" });
    }

    const songs = await Song.find({
      nombre: { $regex: searchQuery, $options: 'i' },
    }).populate('artista_id', 'nombre_artistico');

    res.json(songs);
  } catch (error) {
    console.error("Error in searchSong:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getSongsByArtist = async (req, res) => {
  try {
    const { artistId } = req.params; // Obtener el artistId desde los parámetros de la URL
    if (!artistId) {
      return res.status(400).json({ message: "Artist ID is required" });
    }

    const songs = await Song.find({ artista_id: artistId }) // Filtrar canciones por artistId
      .populate('artista_id', 'nombre_artistico'); // Obtener los detalles del artista si es necesario

    res.json(songs);
  } catch (error) {
    console.error("Error in getSongsByArtist:", error);
    res.status(500).json({ message: "Server error" });
  }
};



const deleteSong = async (req, res) => {
  try {
    const { id } = req.params; // ID de la canción enviada como parámetro en la ruta

    const song = await Song.findById(id); 

    if (!song) {
      return res.status(404).json({ message: 'La canción no existe.' });
    }

    // Eliminar la canción utilizando deleteOne()
    await Song.deleteOne({ _id: id });

    res.status(200).json({ message: 'Canción eliminada exitosamente.' });
  } catch (error) {
    console.error('Error eliminando canción:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};



module.exports = { searchSong, getAllSongs, getSongsByAlbum, deleteSong, getSongsByArtist };
