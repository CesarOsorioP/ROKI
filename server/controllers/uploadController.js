const Artist = require('../models/Artist');
const Song = require('../models/Song');
const mongoose = require('mongoose');

// Subir una canción
exports.uploadSong = async (req, res) => {
  try {
    const { nombre, genero, duracion, fecha_publicacion, album_id, artista_id } = req.body;

    // Verificar y loggear datos recibidos
    console.log('Datos recibidos:', req.body);
    console.log('Archivos recibidos:', req.files);

    if (!artista_id) {
      return res.status(400).json({ error: 'El ID del artista es requerido.' });
    }

    // Verificar si el artista_id es un ObjectId válido
    if (!mongoose.Types.ObjectId.isValid(artista_id)) {
      return res.status(400).json({ error: 'El ID del artista no es válido.' });
    }

    // Verificar si album_id es un ObjectId válido, si está presente
    let albumObjectId = null;
    if (album_id) {
      if (!mongoose.Types.ObjectId.isValid(album_id)) {
        return res.status(400).json({ error: 'El ID del álbum no es válido.' });
      }
      albumObjectId = new mongoose.Types.ObjectId(album_id);
    }

    // Obtener solo los nombres de archivo para guardar en la base de datos
    const imagen_portada = req.files['imagen'] ? req.files['imagen'][0].filename : null;
    const enlace_cancion = req.files['audio'] ? req.files['audio'][0].filename : null;

    const song = new Song({
      nombre,
      artista_id: new mongoose.Types.ObjectId(artista_id),
      album_id: albumObjectId,
      genero,
      duracion,
      fecha_publicacion,
      imagen_portada,
      enlace_cancion,
    });

    await song.save();

    const artist = await Artist.findById(artista_id);
    if (artist) {
      artist.canciones.push(song._id);
      await artist.save();
    }

    res.status(201).json({ message: 'Canción creada con éxito', song });
  } catch (error) {
    console.error("Error in uploadSong:", error.message);
    res.status(500).json({ error: 'Error al crear la canción', details: error.message });
  }
};
