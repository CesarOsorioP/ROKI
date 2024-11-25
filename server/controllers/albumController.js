const Album = require('../models/Album');

const searchAlbums = async (req, res) => {
  try {
    const searchQuery = req.query.search;
    if (!searchQuery) {
      return res.status(400).json({ message: "Search query is required" });
    }

    const albums = await Album.find({
      nombre: { $regex: searchQuery, $options: 'i' },
    }).populate('artista_id', 'nombre_artistico');

    res.json(albums);
  } catch (error) {
    console.error("Error in searchAlbums:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getAlbumsByArtist = async (req, res) => {
  try {
    const { artistId } = req.query;
    if (!artistId) {
      return res.status(400).json({ message: "Artist ID is required" });
    }

    const albums = await Album.find({ artista_id: artistId }).populate('artista_id', 'nombre_artistico');
    res.json(albums);
  } catch (error) {
    console.error("Error in getAlbumsByArtist:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Nueva función para obtener todos los álbumes
const getAlbums = async (req, res) => {
  try {
    const albums = await Album.find().populate('artista_id', 'nombre_artistico');
    res.json(albums);
  } catch (error) {
    console.error("Error in getAlbums:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Nueva función para obtener un álbum por su ID
const getAlbumById = async (req, res) => {
  try {
    const { id } = req.params;
    const album = await Album.findById(id).populate('artista_id', 'nombre_artistico');
    if (!album) {
      return res.status(404).json({ message: "Album not found" });
    }
    res.json(album);
  } catch (error) {
    console.error("Error in getAlbumById:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { searchAlbums, getAlbumsByArtist, getAlbums, getAlbumById };
