const Artist = require('../models/Artist');
const Album = require('../models/Album');
const Song = require('../models/Song');

// Subir un nuevo álbum o EP
exports.uploadAlbumOrEP = async (req, res) => {
  try {
    const { tipo, nombre, genero, fecha_publicacion } = req.body;
    const artistaId = req.user._id; // El ID del artista autenticado

    // Verificar el tipo (álbum o EP)
    if (tipo !== 'album' && tipo !== 'ep') {
      return res.status(400).json({ error: 'El tipo debe ser "album" o "ep"' });
    }

    // Crear nuevo álbum o EP
    const album = new Album({
      nombre,
      artista_id: artistaId,
      genero,
      fecha_publicacion,
      imagen_portada: req.file ? req.file.path : null,
    });

    await album.save();

    // Agregar el álbum al artista
    const artist = await Artist.findById(artistaId);
    if (tipo === 'album') artist.albumes.push(album._id);
    else artist.eps.push(album._id);
    await artist.save();

    res.status(201).json({ message: `${tipo.charAt(0).toUpperCase() + tipo.slice(1)} creado con éxito`, album });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear el álbum o EP' });
  }
};

// Subir una canción
exports.uploadSong = async (req, res) => {
    try {
      const { nombre, genero, duracion, fecha_publicacion, album_id, artista_id } = req.body; // Captura el ID del artista
  
      if (!artista_id) {
        return res.status(400).json({ error: 'El ID del artista es requerido.' });
      }
  
      const song = new Song({
        nombre,
        artista_id: artista_id, // Usa el ID del artista proporcionado
        album_id: album_id || null,
        genero,
        duracion,
        fecha_publicacion,
        imagen_portada: req.files['imagen'] ? req.files['imagen'][0].path : null,
        enlace_cancion: req.files['audio'] ? req.files['audio'][0].path : null,
      });
  
      await song.save();
  
      const artist = await Artist.findById(artista_id);
      if (artist) {
        artist.canciones.push(song._id);
        await artist.save();
      }
  
      res.status(201).json({ message: 'Canción creada con éxito', song });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al crear la canción' });
    }
  };