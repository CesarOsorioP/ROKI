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
    const { artistId } = req.params;
    if (!artistId) {
      return res.status(400).json({ message: "Artist ID is required" });
    }

    const songs = await Song.find({ artista_id: artistId })
      .populate('artista_id', 'nombre_artistico');

    res.json(songs);
  } catch (error) {
    console.error("Error in getSongsByArtist:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteSong = async (req, res) => {
  try {
    const { id } = req.params;
    const song = await Song.findById(id);

    if (!song) {
      return res.status(404).json({ message: 'La canción no existe.' });
    }

    await Song.deleteOne({ _id: id });
    res.status(200).json({ message: 'Canción eliminada exitosamente.' });
  } catch (error) {
    console.error('Error eliminando canción:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};


// Controlador para obtener canciones por género
const getSongsByGenre = async (req, res) => {
  try {
    const { genre } = req.params; // Obtén el género de los parámetros de la URL

    if (!genre) {
      return res.status(400).json({ message: "Genre is required" });
    }

    // Realiza la búsqueda en la base de datos
    const songs = await Song.find({ genero: genre }).populate('artista_id', 'nombre_artistico');

    if (!songs || songs.length === 0) {
      return res.status(404).json({ message: "No songs found for this genre" });
    }

    res.status(200).json(songs); // Devuelve las canciones como respuesta
  } catch (error) {
    console.error("Error in getSongsByGenre:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};



module.exports = { 
  searchSong, 
  getAllSongs, 
  getSongsByAlbum, 
  deleteSong, 
  getSongsByArtist, 
  getSongsByGenre 
};
