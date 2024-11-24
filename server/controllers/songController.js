const Song = require('../models/Song');

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

module.exports = { searchSong, getAllSongs };
