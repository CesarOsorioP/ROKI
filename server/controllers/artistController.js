const Artist = require('../models/Artist');
const Album = require('../models/Album');
const Song = require('../models/Song');

// Obtener todos los artistas
const getAllArtists = async (req, res) => {
  try {
    const artists = await Artist.find();
    res.json(artists);
  } catch (error) {
    console.error("Error fetching artists:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Obtener detalles de un artista
// Obtener detalles de un artista
const getArtistDetail = async (req, res) => {
  const { artistId } = req.params;

  try {
    const artist = await Artist.findById(artistId);
    if (!artist) {
      return res.status(404).json({ message: 'Artista no encontrado' });
    }

    // Usar populate para obtener los datos completos de los álbumes y canciones
    const albums = await Album.find({ artistId }).populate('artistId');
    const songs = await Song.find({ artistId }).populate('artistId');

    res.json({ artist, albums, songs });
  } catch (error) {
    console.error('Error al obtener los detalles del artista:', error);
    res.status(500).json({ message: 'Error al obtener los detalles del artista' });
  }
};





const searchArtists = async (req, res) => {
  try {
    const searchQuery = req.query.search;
    if (!searchQuery) {
      return res.status(400).json({ message: "Search query is required" });
    }

    const artists = await Artist.find({
      nombre_artistico: { $regex: searchQuery, $options: 'i' },
    });

    res.json(artists);
  } catch (error) {
    console.error("Error in searchArtists:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getAllArtists,
  getArtistDetail,
  searchArtists
};
