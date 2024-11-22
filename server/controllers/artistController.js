const Artist = require('../models/Artist');

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

module.exports = { searchArtists };
