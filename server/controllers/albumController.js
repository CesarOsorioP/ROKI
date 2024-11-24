const Album = require('../models/Album');
const Song = require('../models/Song');

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

module.exports = { searchAlbums };
