const User = require('../models/User');
const Song = require('../models/Song');

// Like/Unlike una canción
const likeSong = async (req, res) => {
  try {
    const { userId, songId } = req.params;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Asegúrate de que el campo favoritos y favoritos.canciones existen
    if (!user.favoritos) {
      user.favoritos = { canciones: [], albumes: [] };
    }
    if (!user.favoritos.canciones) {
      user.favoritos.canciones = [];
    }

    const likedSongs = user.favoritos.canciones;
    if (likedSongs.includes(songId)) {
      user.favoritos.canciones = likedSongs.filter((id) => id !== songId);
    } else {
      user.favoritos.canciones.push(songId);
    }

    await user.save();
    res.json(user.favoritos.canciones);
  } catch (error) {
    console.error("Error liking/unliking song:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Obtener canciones favoritas del usuario
const getUserLikedSongs = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).populate({
      path: 'favoritos.canciones',
      populate: { path: 'artista_id', select: 'nombre_artistico' }
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user.favoritos.canciones);
  } catch (error) {
    console.error("Error fetching liked songs:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// Obtener la información del usuario
const getUserInfo = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).populate('favoritos.canciones').populate('playlists').populate('seguidores').populate('siguiendo');

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error fetching user info:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  likeSong,
  getUserLikedSongs,
  getUserInfo
};
