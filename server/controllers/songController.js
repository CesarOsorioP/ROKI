const Song = require('../models/Song');  // Asegúrate de importar el modelo correcto

const searchSong = async (req, res) => {
  try {
    const searchQuery = req.query.search;  // Obtén el parámetro 'search' desde la URL
    if (!searchQuery) {
      return res.status(400).json({ message: "Search query is required" });
    }

    // Busca canciones cuyo nombre coincida con la consulta de búsqueda
    const songs = await Song.find({
      nombre: { $regex: searchQuery, $options: 'i' },  // Usamos 'i' para que sea insensible a mayúsculas
    }).populate('artista_id', 'nombre_artistico'); // Opcional: si quieres obtener también el nombre artístico del artista relacionado

    // Responde con los resultados encontrados
    res.json(songs);
  } catch (error) {
    console.error("Error in searchSong:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { searchSong };
