const Artist = require('../models/Artist');
const Album = require('../models/Album');
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

    // Verificar si album_id es un ObjectId válido
    if (!album_id || !mongoose.Types.ObjectId.isValid(album_id)) {
      return res.status(400).json({ error: 'El ID del álbum no es válido.' });
    }

    // Obtener el álbum para usar su imagen de portada
    const album = await Album.findById(album_id);
    if (!album) {
      return res.status(404).json({ error: 'Álbum no encontrado.' });
    }

    const song = new Song({
      nombre,
      artista_id: new mongoose.Types.ObjectId(artista_id),
      album_id: new mongoose.Types.ObjectId(album_id),
      genero,
      duracion,
      fecha_publicacion,
      imagen_portada: album.imagen_portada, // Usar la imagen de portada del álbum
      enlace_cancion: req.files['audio'] ? req.files['audio'][0].filename : null,
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

// Otros métodos de uploadController.js

// Subir un álbum
exports.uploadAlbum = async (req, res) => {
  try {
    const { nombre, genero, fecha_publicacion, artista_id } = req.body;

    // Verificar y loggear datos recibidos
    console.log('Datos recibidos:', req.body);
    console.log('Archivos recibidos:', req.file);

    if (!artista_id) {
      return res.status(400).json({ error: 'El ID del artista es requerido.' });
    }

    // Verificar si el artista_id es un ObjectId válido
    if (!mongoose.Types.ObjectId.isValid(artista_id)) {
      return res.status(400).json({ error: 'El ID del artista no es válido.' });
    }

    // Obtener solo el nombre de archivo para guardar en la base de datos
    const imagen_portada = req.file ? req.file.filename : null;

    const album = new Album({
      nombre,
      artista_id: new mongoose.Types.ObjectId(artista_id),
      genero,
      fecha_publicacion,
      imagen_portada,
    });

    await album.save();

    const artist = await Artist.findById(artista_id);
    if (artist) {
      artist.albumes.push(album._id);
      await artist.save();
    }

    res.status(201).json({ message: 'Álbum creado con éxito', album });
  } catch (error) {
    console.error("Error in uploadAlbum:", error.message);
    res.status(500).json({ error: 'Error al crear el álbum', details: error.message });
  }
};

