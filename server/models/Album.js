const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AlbumSchema = new Schema({
  nombre: {
    type: String,
    required: true,
  },
  artista_id: {
    type: Schema.Types.ObjectId,
    ref: 'Artist',
    required: true,
  },
  fecha_publicacion: {
    type: Date,
    required: true,
  },
  genero: {
    type: String,
    required: true,
  },
  imagen_portada: {
    type: String,
    required: true,
  },
  canciones: [{
    type: Schema.Types.ObjectId,
    ref: 'Song',
  }],
});

module.exports = mongoose.models.Album || mongoose.model('Album', AlbumSchema);
