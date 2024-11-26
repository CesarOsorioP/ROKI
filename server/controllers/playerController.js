const Song = require('../models/Song');

let currentSongIndex = 0; // Indice para manejar la canción actual
const songQueue = []; // Simula una cola de canciones para reproducir

const getCurrentSong = async (req, res) => {
  try {
    if (songQueue.length > 0) {
      const song = await Song.findById(songQueue[currentSongIndex]);
      res.json(song);
    } else {
      res.status(404).json({ message: "No songs in the queue" });
    }
  } catch (error) {
    console.error("Error in getCurrentSong:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getNextSong = async (req, res) => {
  try {
    if (songQueue.length > 0) {
      currentSongIndex = (currentSongIndex + 1) % songQueue.length;
      const song = await Song.findById(songQueue[currentSongIndex]);
      res.json(song);
    } else {
      res.status(404).json({ message: "No songs in the queue" });
    }
  } catch (error) {
    console.error("Error in getNextSong:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getPreviousSong = async (req, res) => {
  try {
    if (songQueue.length > 0) {
      currentSongIndex = (currentSongIndex - 1 + songQueue.length) % songQueue.length;
      const song = await Song.findById(songQueue[currentSongIndex]);
      res.json(song);
    } else {
      res.status(404).json({ message: "No songs in the queue" });
    }
  } catch (error) {
    console.error("Error in getPreviousSong:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getCurrentSong, getNextSong, getPreviousSong };
