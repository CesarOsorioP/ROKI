const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SongSchema = new Schema({
    nombre: {
        type: String,
        required: true,
    },
    artista_id: {
        type: Schema.Types.ObjectId,
        ref: 'Artist',
        required: true,
    },
    album_id: {
        type: Schema.Types.ObjectId,
        ref: 'Album',
        default: null,
    },
    genero: {
        type: String,
        required: true,
    },
    fecha_publicacion: {
        type: Date,
        required: true,
    },
    duracion: {
        type: Number,
        required: true,
    },
    imagen_portada: {
        type: String,
        required: true,
    },
    enlace_cancion: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.models.Song || mongoose.model('Song', SongSchema);
